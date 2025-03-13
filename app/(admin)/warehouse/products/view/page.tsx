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
import { getCookie } from "cookies-next";
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
  const [isLoading, setIsLoading] = useState(true);
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
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (result.status === 200) {
        const data = result.data.data as OrderResponse;
        setOrders(data.orders);
        setTotalPages(data.totalPages);
        toast.success("Orders loaded successfully");
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
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      toast.success("Order cancelled successfully");
      await fetchOrders();
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
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-lg font-semibold">Orders</h2>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <div>Loading orders...</div>
          </div>
        ) : orders.length === 0 ? (
          <div className="h-24 flex items-center justify-center">
            <div>No orders found.</div>
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
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
