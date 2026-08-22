"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, Filter } from "lucide-react";
import { getCookie } from "cookies-next";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SALES_API } from "@/config";

interface Order {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: "SUCCESSFUL" | "PENDING";
  createdAt: string;
  updatedAt: string;
  warehouse: {
    id: string;
    name: string;
    location: string;
    capacity: number;
    createdAt: string;
    updatedAt: string;
  };
}

interface OrderResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  orders: Order[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const statusParam = statusFilter ? `&status=${statusFilter}` : "";
      const result = await axios.get(
        `${SALES_API}?page=${page}${statusParam}`,
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );

      if (result.status === 200) {
        const data = result.data.data as OrderResponse;
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading orders", { description: "Try again later" });
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId: string) => {
    try {
      const response = await axios.patch(
        `${SALES_API}/${orderId}/status`,
        { status: "SUCCESSFUL" },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );

      if (response.status === 200) {
        toast.success("Order status updated", {
          description: "Order has been marked as successful",
        });
        fetchOrders();
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Update failed", {
        description: "Could not update order status. Please try again.",
      });
    }
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order no.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "customerName",
      header: "Customer name",
    },
    {
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "warehouse.name",
      header: "Warehouse",
    },
    {
      accessorKey: "warehouse.location",
      header: "Location",
    },
    {
      accessorKey: "warehouse.capacity",
      header: "Capacity",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        new Date(row.getValue("createdAt")).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const orderId = row.original.id;

        if (status === "PENDING") {
          return (
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer"
              onClick={() => updateOrderStatus(orderId)}
            >
              {status} (Click to update)
            </Badge>
          );
        }

        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="flex flex-col h-full">
      <Toaster />
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-lg font-semibold">Orders</h2>
          <div className="flex items-center space-x-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {statusFilter ? `Status: ${statusFilter}` : "All Orders"}
                  <Filter className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  <div className="flex justify-between w-full">
                    All Orders{" "}
                    {!statusFilter && <Check className="ml-2 h-4 w-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>
                  <div className="flex justify-between w-full">
                    PENDING{" "}
                    {statusFilter === "PENDING" && (
                      <Check className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("SUCCESSFUL")}>
                  <div className="flex justify-between w-full">
                    SUCCESSFUL{" "}
                    {statusFilter === "SUCCESSFUL" && (
                      <Check className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            Loading orders...
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
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
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
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {orders.length > 0 && (
              <span>
                Page {page} of {totalPages} • Showing {orders.length} order
                {orders.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1 || isLoading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || isLoading || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
