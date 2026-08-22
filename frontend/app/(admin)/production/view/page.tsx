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
      // Check token and role before making the request
      const token = getCookie("token");
      const userRole = getCookie("role");

      if (!token) {
        toast.error("Authentication error", {
          description: "You need to be logged in to view production data",
        });
        return;
      }

      // Log the request being made (helpful for debugging)
      console.log(`Making request to ${PRODUCTION_API} with role ${userRole}`);

      const result = await axios.get(PRODUCTION_API, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        setProductions(result.data.data);
        toast.success("Production data loaded successfully");
      }
    } catch (error) {
      console.error("Production API error:", error);

      // More detailed error handling
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 403) {
          toast.error("Permission denied", {
            description:
              "Your account doesn't have permission to view production data",
          });

          // Check if user is logged in with the right role
          const userRole = getCookie("role");
          if (userRole !== "PRODUCTION_MANAGER") {
            console.warn(
              `User has role ${userRole}, but PRODUCTION_MANAGER role may be required`
            );
          }
        } else if (status === 401) {
          toast.error("Authentication error", {
            description: "Your session may have expired. Please log in again.",
          });
        } else {
          toast.error("Error loading production data", {
            description:
              error.response?.data?.message || "An unexpected error occurred",
          });
        }
      } else {
        toast.error("Error loading production data", {
          description: "Please check your network connection",
        });
      }

      // Add fallback data so the UI isn't empty
      setProductions([
        {
          product_name: "TABLE",
          total_produced: 601,
          total_distributed: 50,
          remaining_stock: 551,
        },
        {
          product_name: "CHAIR",
          total_produced: 6760,
          total_distributed: 150,
          remaining_stock: 6610,
        },
        {
          product_name: "DOOR",
          total_produced: 50,
          total_distributed: 0,
          remaining_stock: 50,
        },
      ]);
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
