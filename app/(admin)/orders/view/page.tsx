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
import NewOrderModal from "@/components/NewOrderModal";

interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  product: string;
  amount: number;
  warehouseId: string;
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

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order no.",
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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Due Date",
    cell: ({ row }) => {
      return new Date(row.getValue("updatedAt")).toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "SUCCESSFUL" ? "default" : "secondary"}
          className={
            status === "SUCCESSFUL"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const order = row.original;
      // Get the handleCancelOrder from table options
      const { handleCancelOrder } = table.options.meta as {
        handleCancelOrder: (orderId: string) => Promise<void>;
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 bg-gray-800 text-white hover:bg-gray-700"
          >
            Request
          </Button>
          <Button
            onClick={() => handleCancelOrder(order.id)}
            variant="secondary"
            size="sm"
            className="h-8 bg-gray-800 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
        </div>
      );
    },
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.status === 200) {
        const data = result.data.data as OrderResponse;
        setOrders(data.orders);
        setTotalPages(data.totalPages);
        toast("Orders loaded successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading orders", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Order cancelled successfully");
      await fetchOrders(); // Refresh the orders list after deletion
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling order", {
        description: "Please try again later",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const table = useReactTable({
    data: orders,
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
    meta: {
      handleCancelOrder,
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
              <h2 className="text-lg font-semibold">Orders</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Download all</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuItem
                          key={column.id}
                          className="capitalize"
                          onClick={() =>
                            column.toggleVisibility(!column.getIsVisible())
                          }
                        >
                          {column.id}
                        </DropdownMenuItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="p-4">
        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <div>Loading orders...</div>
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
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
