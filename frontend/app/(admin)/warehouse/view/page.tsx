"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios"; // Add AxiosError import
import { Toaster, toast } from "sonner";
import { z } from "zod";
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
import { useRouter } from "next/navigation"; // Use navigation, not router

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
import { PRODUCTION_API, SALES_API } from "@/config";

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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Due Date",
    cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleDateString(),
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
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false); // Move useState outside of onSubmit
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter(); // Initialize router

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(`${PRODUCTION_API}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
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
      await axios.delete(`${SALES_API}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      toast.success("Order cancelled successfully");
      await fetchOrders(); // Refresh the orders list after deletion
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling order", {
        description: "Please try again later",
      });
    }
  };

  // Define the form schema
  const formSchema = z.object({
    customerName: z.string(),
    customerAddress: z.string(),
    product: z.string(),
    amount: z.number(),
    warehouseId: z.string(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post(PRODUCTION_API, values, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (res.status === 201) {
        toast.success("Products added successfully");
        router.push("/production/view");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        const errorMessage =
          error.response?.data?.message || "Failed to add products";
        toast.error(errorMessage);
      } else {
        console.error("Error creating products:", error);
        toast.error("Failed to add products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  useEffect(() => {
    // Any router operations that happen on component mount should be here
    // For example, checking auth and redirecting if needed
  }, []);

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
                    .map((column) => (
                      <DropdownMenuItem
                        key={column.id}
                        className="capitalize"
                        onClick={() =>
                          column.toggleVisibility(!column.getIsVisible())
                        }
                      >
                        {column.id}
                      </DropdownMenuItem>
                    ))}
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
