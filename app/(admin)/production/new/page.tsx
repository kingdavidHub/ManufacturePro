"use client";

import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PRODUCTION_API } from "@/config";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "cookies-next";
import axios from "axios";
import { toast } from "sonner";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { useState } from "react";

const formSchema = z.object({
  products: z.array(
    z.object({
      product_name: z.string().min(1, "Product name is required"),
      product_amount: z.number().min(1, "Amount must be greater than 0"),
    })
  ),
});

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [
        {
          product_name: "",
          product_amount: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "products",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post(PRODUCTION_API, values, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (res.status === 201) {
        setLoading(false);
        toast.success("Products added successfully");
        router.push("/production/view");
      }
    } catch (error) {
      console.error("Error creating products:", error);
      toast.error("Failed to add products");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-background rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">New Products</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
              >
                <FormField
                  control={form.control}
                  name={`products.${index}.product_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TABLE">Table</SelectItem>
                          <SelectItem value="CHAIR">Chair</SelectItem>
                          <SelectItem value="DOOR">Door</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`products.${index}.product_amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount"
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

                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ product_name: "", product_amount: 0 })}
            >
              Add Another Product
            </Button>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/production/view")}
              >
                Cancel
              </Button>
              <Button type="submit">Create Products</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
