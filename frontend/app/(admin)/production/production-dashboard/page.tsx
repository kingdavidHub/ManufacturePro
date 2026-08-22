"use client";

import { useEffect, useState, useCallback } from "react"; // Added useCallback
import axios from "axios";
import { Toaster, toast } from "sonner";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getCookie } from "cookies-next";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRODUCTION_API } from "@/config";

// Define types for the API response
interface StatusSummary {
  total_amount: number;
  count: number;
}

interface Distribution {
  product_name: string;
  status_summary: {
    PENDING: StatusSummary;
    SUCCESSFUL: StatusSummary;
  };
}

interface Warehouse {
  warehouse_id: string;
  warehouse_name: string;
  distributions: Distribution[];
}

// Define table columns
const columns: ColumnDef<Distribution>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.product_name}</div>
    ),
  },
  {
    accessorKey: "status_summary.PENDING.total_amount",
    header: "Pending Amount",
    cell: ({ row }) => row.original.status_summary.PENDING.total_amount,
  },
  {
    accessorKey: "status_summary.PENDING.count",
    header: "Pending Orders",
    cell: ({ row }) => row.original.status_summary.PENDING.count,
  },
  {
    accessorKey: "status_summary.SUCCESSFUL.total_amount",
    header: "Successful Amount",
    cell: ({ row }) => row.original.status_summary.SUCCESSFUL.total_amount,
  },
  {
    accessorKey: "status_summary.SUCCESSFUL.count",
    header: "Successful Orders",
    cell: ({ row }) => row.original.status_summary.SUCCESSFUL.count,
  },
  {
    id: "total",
    header: "Total Amount",
    cell: ({ row }) => {
      const pending = row.original.status_summary.PENDING.total_amount;
      const successful = row.original.status_summary.SUCCESSFUL.total_amount;
      return pending + successful;
    },
  },
];

export default function ProductionDashboardPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Get the distributions for the selected warehouse
  const selectedDistributions =
    warehouses.find((w) => w.warehouse_id === selectedWarehouseId)
      ?.distributions || [];

  // Use useCallback to memoize the fetchDashboardData function
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(`${PRODUCTION_API}/dashboard`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (result.status === 200) {
        const warehouseData = result.data.data;
        setWarehouses(warehouseData);

        // Set the first warehouse as default selection
        if (warehouseData.length > 0 && !selectedWarehouseId) {
          setSelectedWarehouseId(warehouseData[0].warehouse_id);
        }

        toast.success("Dashboard data loaded successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading dashboard data", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedWarehouseId]); // Add selectedWarehouseId as dependency

  // Update useEffect to include fetchDashboardData in dependency array
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const table = useReactTable({
    data: selectedDistributions,
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
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-lg font-semibold">Production Dashboard</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Select Warehouse</h3>
          <div className="max-w-xs">
            <Select
              value={selectedWarehouseId}
              onValueChange={setSelectedWarehouseId}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {warehouses.map((warehouse) => (
                    <SelectItem
                      key={warehouse.warehouse_id}
                      value={warehouse.warehouse_id}
                    >
                      {warehouse.warehouse_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <div>Loading dashboard data...</div>
          </div>
        ) : (
          <>
            {selectedWarehouseId && (
              <div className="mb-4">
                <h3 className="text-md font-medium">
                  Distribution for{" "}
                  {
                    warehouses.find(
                      (w) => w.warehouse_id === selectedWarehouseId
                    )?.warehouse_name
                  }
                </h3>
              </div>
            )}

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
                          No distribution data found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={fetchDashboardData} variant="outline">
                Refresh Data
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
