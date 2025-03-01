// "use client"

// import * as React from "react"
// import { CalendarIcon } from "lucide-react"
// import { format } from "date-fns"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"

// const formSchema = z.object({
//   productName: z.string().min(1, "Product name is required"),
//   productId: z.string().min(1, "Product ID is required"),
//   buyingPrice: z.string().min(1, "Buying price is required"),
//   warehouse: z.string().min(1, "Warehouse is required"),
//   quantity: z.string().min(1, "Quantity is required"),
//   unit: z.string().min(1, "Unit is required"),
//   expiryDate: z.date().optional(),
// })

// const NewProductModal =() =>{
//   const [open, setOpen] = React.useState(false)
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       productName: "",
//       productId: "",
//       buyingPrice: "",
//       warehouse: "",
//       quantity: "",
//       unit: "",
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values)
//     setOpen(false)
//     form.reset()
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="default">Add Product</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>New Product</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="productName"
//               render={({ field }) => (
//                 <FormItem className="flex gap-4 items-center">
//                   <FormLabel className="w-64">Product Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter Product name" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="productId"
//               render={({ field }) => (
//                 <FormItem  className="flex gap-4 items-center">
//                   <FormLabel className="w-64">Product ID</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter Product ID" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="buyingPrice"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="w-64">Buying Price</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter Price" type="number" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="warehouse"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Warehouse</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select warehouse" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="A">Warehouse A</SelectItem>
//                       <SelectItem value="B">Warehouse B</SelectItem>
//                       <SelectItem value="C">Warehouse C</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="quantity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Quantity</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter Quantity" type="number" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="unit"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Unit</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter Unit" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="expiryDate"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Expiry Date</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//                         >
//                           {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex justify-end space-x-4 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => {
//                   setOpen(false)
//                   form.reset()
//                 }}
//               >
//                 Discard
//               </Button>
//               <Button type="submit">Add Product</Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }


// export default NewProductModal;


"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query"

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productId: z.string().min(1, "Product ID is required"),
  buyingPrice: z.string().min(1, "Buying price is required"),
  warehouse: z.string().min(1, "Warehouse is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required"),
  expiryDate: z.date().optional(),
})

const NewProductModal = () => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productId: "",
      buyingPrice: "",
      warehouse: "",
      quantity: "",
      unit: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setOpen(false)
    form.reset()
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add Product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Product</DialogTitle>
          </DialogHeader>
          <ProductForm form={form} onSubmit={onSubmit} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">Add Product</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New Product</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <ProductForm form={form} onSubmit={onSubmit} setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function ProductForm({
  form,
  onSubmit,
  setOpen,
}: {
  form: any
  onSubmit: (values: z.infer<typeof formSchema>) => void
  setOpen: (open: boolean) => void
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buyingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buying Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="warehouse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A">Warehouse A</SelectItem>
                  <SelectItem value="B">Warehouse B</SelectItem>
                  <SelectItem value="C">Warehouse C</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Enter Quantity" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="Enter Unit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false)
              form.reset()
            }}
          >
            Discard
          </Button>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Form>
  )
}

export default NewProductModal;