"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { getCookie } from "cookies-next";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCTION_API } from "@/config";

const formSchema = z.object({
  warehouse_name: z.string().min(1, "Warehouse name is required"),
  location: z.string().min(1, "Location is required"),
  distributions: z.array(
    z.object({
      product_name: z.string().min(1, "Product name is required"),
      amount: z.number().min(1, "Amount must be greater than 0"),
    })
  ),
});

const Distribute = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([
    { name: "SwiftStock", location: "ILUPEJU" },
    { name: "NextGen", location: "MOWE" },
    { name: "PrimeStorage", location: "LEKKI" }, 
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouse_name: "",
      location: "",
      distributions: [
        {
          product_name: "",
          amount: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "distributions",
    control: form.control,
  });

  // Update location when warehouse is selected
  const onWarehouseChange = (value: string) => {
    const selectedWarehouse = warehouses.find((w) => w.name === value);
    if (selectedWarehouse) {
      form.setValue("warehouse_name", value);
      form.setValue("location", selectedWarehouse.location);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post(`${PRODUCTION_API}/distribute`, values, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (res.status === 201) {
        toast.success("Products distributed successfully");
        router.push("/production/view");
      }
    } catch (error) {
      console.error("Error distributing products:", error);
      toast.error("Failed to distribute products");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-background rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">Distribute Products</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormField
                control={form.control}
                name="warehouse_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse</FormLabel>
                    <Select
                      onValueChange={(value) => onWarehouseChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select warehouse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {warehouses.map((warehouse) => (
                          <SelectItem
                            key={warehouse.name}
                            value={warehouse.name}
                          >
                            {warehouse.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Location" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <h4 className="text-md font-medium mt-6">Products to Distribute</h4>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
              >
                <FormField
                  control={form.control}
                  name={`distributions.${index}.product_name`}
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
                  name={`distributions.${index}.amount`}
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
              onClick={() => append({ product_name: "", amount: 0 })}
            >
              Add Another Product
            </Button>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/production/view")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Distributing..." : "Distribute Products"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Distribute;
