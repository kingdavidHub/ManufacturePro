"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCookie } from "cookies-next";
import { WAREHOUSE_API } from "@/config";

const formSchema = z.object({
  name: z.string().min(1, "Warehouse name is required"),
  location: z.string().min(1, "Location is required"),
  capacity: z.string().min(1, "Capacity is required"),
});

export default function NewWarehousePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      capacity: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        WAREHOUSE_API,
        values,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Warehouse created successfully");
        router.push("/warehouse/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create warehouse");
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-background rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">New Warehouse</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter warehouse name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter warehouse location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter warehouse capacity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/warehouse/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit">Create Warehouse</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
