"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios"; // Add AxiosError import

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "cookies-next";
import { SALES_API } from "@/config";

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerAddress: z.string().min(1, "Customer address is required"),
  product: z.string().min(1, "Product is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  warehouseName: z.string().min(1, "Warehouse is required"),
});

export default function NewOrderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerAddress: "",
      product: "",
      amount: 0,
      warehouseName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${SALES_API}`, values, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (response.status === 201) {
        toast.success("Order created successfully");
        setTimeout(() => {
          router.push("/sales/orders/view");
        }, 1000); // Wait for toast to show
      }
    } catch (error: unknown) {
      // Changed from 'any' to 'unknown'
      console.error("Order creation error:", error);

      // Type guard to check if this is an axios error
      if (axios.isAxiosError(error)) {
        console.log("Error response:", error.response);

        // More robust error handling
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("Order Failed", {
              description:
                error.response.data?.message || "Failed to create order",
            });
          } else if (error.response.status === 500) {
            toast.error("Server Error", {
              description:
                "The server encountered an error. Please try again later.",
            });
          } else {
            toast.error("Order Failed", {
              description:
                error.response.data?.message || "An unexpected error occurred",
            });
          }
        } else {
          // Network error or other issues
          toast.error("Connection Error", {
            description: "Please check your connection and try again",
          });
        }
      } else {
        // For non-axios errors
        toast.error("Error", {
          description: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster />

      <div className="bg-background rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">New Order</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter customer address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TABLE">TABLE</SelectItem>
                          <SelectItem value="CHAIR">CHAIR</SelectItem>
                          <SelectItem value="DOOR">DOOR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="warehouseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warehouse</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select warehouse" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NextGen">NextGen</SelectItem>
                          <SelectItem value="SwiftStock">SwiftStock</SelectItem>
                          <SelectItem value="PrimeStorage">
                            PrimeStorage
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/sales/orders/view")}
                disabled={isSubmitting}
              >
                Discard
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Order"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
