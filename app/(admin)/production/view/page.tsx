"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { getCookie } from "cookies-next";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRODUCTION_API } from "@/config";

interface Production {
  product_name: string;
  total_produced: number;
  total_distributed: number;
  remaining_stock: number;
}

const columns: ColumnDef<Production>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
  },
  {
    accessorKey: "total_produced",
    header: "Total Produced",
  },
  {
    accessorKey: "total_distributed",
    header: "Total Distributed",
  },
  {
    accessorKey: "remaining_stock",
    header: "Remaining Stock",
  },
];

export default function ProductionPage() {
  const [productions, setProductions] = useState<Production[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const fetchProduction = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(PRODUCTION_API, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (result.status === 200) {
        setProductions(result.data.data);
        toast.success("Production data loaded successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading production data", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduction();
  }, []);

  const table = useReactTable({
    data: productions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Toaster />
      {/* Header section */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Production Overview</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={fetchProduction}>
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="p-4">
        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <div>Loading production data...</div>
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No production data found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
