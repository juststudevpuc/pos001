// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Spinner } from "@/components/ui/spinner";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   addPurchae,
//   clearAllPurchase,
//   deletePuchase,
//   updatePuchase,
// } from "@/store/purchaseSlice";
// import { request } from "@/utils/request/request";
// import { Image, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function PurchasePage() {
//   const [supplier, setSupplier] = useState([]);
//   const [products, setProduct] = useState([]);
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [supplierId, setSupplierId] = useState("");
//   const [paid, setPaid] = useState("");
//   const [paidDate, setPaidDate] = useState("");
//   const [shippingCost, setShippingCost] = useState("");

//   const fetchingData = async () => {
//     setLoading(true);
//     const supplier = await request("supplier", "get");
//     const products = await request("products", "get");
//     const purchase = await request("purchase", "get");
//     if (supplier || products || purchase) {
//       console.log("Response Supplier : ", supplier);
//       setSupplier(supplier?.data);
//       setProduct(products?.data);
//       setPurchases(purchase?.data);
//       setLoading(false);
//     }
//   };

//   const dispatch = useDispatch();

//   const purchase = useSelector((state) => state.purchase);
//   const total = purchase
//     .reduce((acc, item) => acc + item?.qty * item?.cost, 0)
//     .toFixed(2);

//   useEffect(() => {
//     fetchingData();
//   }, []);

//   const tbl_head = [
//     "Product",
//     "Quantity",
//     "Cost",
//     "Retail price",
//     "Ref",
//     "Remark",
//     "Action",
//   ];
//   const tbl_head_show_purcahse = [
//     "No",
//     "Paid",
//     "Paid date",
//     "Shipping cost",
//     "Supplier",
//     "Product",
//     "Image",
//   ];
//   const inputOnChange = (index, field, value) => {
//     dispatch(updatePuchase({ index, field, value }));
//   };
//   return (
//     <div>
//       <h1>Create Purchase</h1>
//       <div className="mt-7 flex gap-3">
//         <div className="flex flex-col gap-2 w-full">
//           <Label>Supplier</Label>
//           <Select
//             value={supplierId}
//             onValueChange={(value) => {
//               setSupplierId(value);
//             }}
//           >
//             <SelectTrigger className={"w-full"}>
//               <SelectValue placeholder="Pls select supplier" />
//             </SelectTrigger>
//             <SelectContent>
//               {supplier.map((item, index) => (
//                 <SelectItem value={item?.id}>{item?.name}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="flex flex-col gap-2 w-full">
//           <Label>Paid</Label>
//           <Input
//             value={paid}
//             onChange={(e) => setPaid(e.target.value)}
//             placeholder="Paid"
//           />
//         </div>
//         <div className="flex flex-col gap-2 w-full">
//           <Label>Shipping cost</Label>
//           <Input
//             value={shippingCost}
//             onChange={(e) => setShippingCost(e.target.value)}
//             placeholder="Shipping Cost"
//           />
//         </div>

//         <div className="flex flex-col gap-2 w-full">
//           <Label>Paid date</Label>
//           <Input
//             type={"date"}
//             value={paidDate}
//             onChange={(e) => setPaidDate(e.target.value)}
//             placeholder="Paid date"
//           />
//         </div>
//       </div>

//       <div className="mt-7">
//         {/* <h1>{brand[0]?.name}</h1> */}

//         <Table>
//           <TableHeader>
//             <TableRow>
//               {tbl_head?.map((item, index) => (
//                 <TableHead key={index}>{item}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {Array.isArray(purchase) &&
//               purchase?.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Select
//                       value={item?.product_id}
//                       onValueChange={(value) => {
//                         inputOnChange(index, "product_id", value);
//                       }}
//                     >
//                       <SelectTrigger className={"w-full"}>
//                         <SelectValue placeholder="Pls select supplier" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {products.map((item, index) => (
//                           <SelectItem key={index} value={item?.id}>
//                             {item?.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </TableCell>
//                   <TableCell>
//                     <Input
//                       type={"number"}
//                       value={item?.qty}
//                       onChange={(e) =>
//                         inputOnChange(index, "qty", e.target.value)
//                       }
//                       placeholder="Quantity"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Input
//                       type={"number"}
//                       value={item?.cost}
//                       onChange={(e) =>
//                         inputOnChange(index, "cost", e.target.value)
//                       }
//                       placeholder="Cost"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Input
//                       type={"number"}
//                       value={item?.retail_price}
//                       onChange={(e) =>
//                         inputOnChange(index, "retail_price", e.target.value)
//                       }
//                       placeholder="Retail price"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Input
//                       value={item?.ref}
//                       onChange={(e) =>
//                         inputOnChange(index, "ref", e.target.value)
//                       }
//                       placeholder="Ref"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Input
//                       value={item?.remark}
//                       onChange={(e) =>
//                         inputOnChange(index, "remark", e.target.value)
//                       }
//                       placeholder="Remark"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       onClick={() => {
//                         dispatch(deletePuchase(index));
//                       }}
//                     >
//                       <Trash />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//         <div className="mt-1">
//           <Button
//             onClick={() => {
//               dispatch(addPurchae());
//             }}
//           >
//             Add product
//           </Button>
//         </div>
//         <div className="flex justify-end">
//           <div className="flex flex-col gap-3">
//             <h1 className="font-bold text-lg">Total : ${total}</h1>
//             <Button
//               onClick={() => {
//                 const payload = {
//                   shipping_cost: shippingCost,
//                   supplier_id: supplierId,
//                   paid: paid,
//                   paid_date: paidDate,
//                   purchase_product: purchase,
//                 };

//                 try {
//                   const res = request("purchase", "post", payload);
//                   if (res) {
//                     console.log("Res Purchase : ", res);
//                     setPaid("");
//                     setPaidDate("");
//                     setSupplierId("");
//                     setShippingCost("");
//                     dispatch(clearAllPurchase());
//                     fetchingData();
//                   }
//                 } catch (error) {
//                   console.log(error);
//                 }

//                 console.log("Item purchase : ", payload);
//               }}
//             >
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="mt-7">
//         {/* <h1>{Supplier[0]?.name}</h1> */}

//         <Table>
//           <TableHeader>
//             <TableRow>
//               {tbl_head_show_purcahse?.map((item, index) => (
//                 <TableHead key={index}>{item}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colspan={7}>
//                   <div className="flex justify-center mt-10">
//                     <Spinner className={"size-7"} />
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               <>
//                 {purchases?.map((item, index) => (
//                   <TableRow>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>${item?.paid}</TableCell>
//                     <TableCell>{item?.paid_date}</TableCell>
//                     <TableCell>{item?.shipping_cost}</TableCell>
//                     <TableCell>{item?.supplier?.name}</TableCell>.
//                     {item?.purchase_product?.map((item1, index1) => (
//                       <div className="">
//                         <TableCell>
//                           {index1 + 1}, {item1?.products?.name} | Quantity:
//                           {item1.qty} | cost: {item1?.cost} | Retial Price:
//                           {item1.retail_price}
//                         </TableCell>
//                         <TableCell>
//                           {item1?.product?.image ? (
//                             <div className="w-28 h-28 rounded-xl overflow-hidden">
//                               <img
//                                 className="w-full h-full"
//                                 src={item1?.product?.image_url}
//                                 alt={`picture : ${item1?.product?.name}`}
//                               />
//                             </div>
//                           ) : (
//                             <div className="w-28 h-28 rounded-xl overflow-hidden">
//                               <div className="w-full h-full flex justify-center items-center bg-gray-300">
//                                 <Image />
//                               </div>
//                             </div>
//                           )}
//                         </TableCell>
//                       </div>
//                     ))}
//                   </TableRow>
//                 ))}
//               </>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  addPurchae,
  clearAllPurchase,
  deletePuchase,
  updatePuchase,
} from "@/store/purchaseSlice";
import { request } from "@/utils/request/request";
import { Image, Trash, Plus, Package, DollarSign, Calendar, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PurchasePage() {
  const [supplier, setSupplier] = useState([]);
  const [products, setProduct] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [paid, setPaid] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [shippingCost, setShippingCost] = useState("");

  const fetchingData = async () => {
    setLoading(true);
    const supplier = await request("supplier", "get");
    const products = await request("products", "get");
    const purchase = await request("purchase", "get");
    if (supplier || products || purchase) {
      console.log("Response Supplier : ", supplier);
      setSupplier(supplier?.data);
      setProduct(products?.data);
      setPurchases(purchase?.data);
      setLoading(false);
    }
  };

  const dispatch = useDispatch();

  const purchase = useSelector((state) => state.purchase);
  const total = purchase
    .reduce((acc, item) => acc + item?.qty * item?.cost, 0)
    .toFixed(2);

  useEffect(() => {
    fetchingData();
  }, []);

  const tbl_head = [
    "Product",
    "Quantity",
    "Cost",
    "Retail price",
    "Ref",
    "Remark",
    "Action",
  ];
  const tbl_head_show_purcahse = [
    "No",
    "Paid",
    "Paid date",
    "Shipping cost",
    "Supplier",
    "Product",
    "Image",
  ];
  const inputOnChange = (index, field, value) => {
    dispatch(updatePuchase({ index, field, value }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
              <Package className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Create Purchase Order</h1>
              <p className="text-slate-600 text-sm mt-1">Manage your inventory purchases efficiently</p>
            </div>
          </div>
        </div>

        {/* Purchase Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Purchase Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <Package size={16} className="text-blue-600" />
                Supplier
              </Label>
              <Select
                value={supplierId}
                onValueChange={(value) => {
                  setSupplierId(value);
                }}
              >
                <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {supplier.map((item, index) => (
                    <SelectItem key={index} value={item?.id}>{item?.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                Paid Amount
              </Label>
              <Input
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                placeholder="0.00"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <Truck size={16} className="text-orange-600" />
                Shipping Cost
              </Label>
              <Input
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                placeholder="0.00"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <Calendar size={16} className="text-purple-600" />
                Paid Date
              </Label>
              <Input
                type={"date"}
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              Products
            </h2>
            <Button
              onClick={() => {
                dispatch(addPurchae());
              }}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              <Plus size={18} className="mr-2" />
              Add Product
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {tbl_head?.map((item, index) => (
                    <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(purchase) && purchase?.length > 0 ? (
                  purchase?.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 min-w-[200px]">
                        <Select
                          value={item?.product_id}
                          onValueChange={(value) => {
                            inputOnChange(index, "product_id", value);
                          }}
                        >
                          <SelectTrigger className="border-slate-300">
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((item, index) => (
                              <SelectItem key={index} value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type={"number"}
                          value={item?.qty}
                          onChange={(e) =>
                            inputOnChange(index, "qty", e.target.value)
                          }
                          placeholder="0"
                          className="border-slate-300 w-24"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type={"number"}
                          value={item?.cost}
                          onChange={(e) =>
                            inputOnChange(index, "cost", e.target.value)
                          }
                          placeholder="0.00"
                          className="border-slate-300 w-28"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type={"number"}
                          value={item?.retail_price}
                          onChange={(e) =>
                            inputOnChange(index, "retail_price", e.target.value)
                          }
                          placeholder="0.00"
                          className="border-slate-300 w-28"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={item?.ref}
                          onChange={(e) =>
                            inputOnChange(index, "ref", e.target.value)
                          }
                          placeholder="Reference"
                          className="border-slate-300 w-32"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={item?.remark}
                          onChange={(e) =>
                            inputOnChange(index, "remark", e.target.value)
                          }
                          placeholder="Notes"
                          className="border-slate-300 w-32"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            dispatch(deletePuchase(index));
                          }}
                          className="shadow-md"
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                      No products added. Click "Add Product" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total and Save Section */}
          <div className="flex justify-end mt-6">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 min-w-[300px] shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 font-medium">Total Amount:</span>
                <span className="text-3xl font-bold text-blue-600">${total}</span>
              </div>
              <Button
                onClick={() => {
                  const payload = {
                    shipping_cost: shippingCost,
                    supplier_id: supplierId,
                    paid: paid,
                    paid_date: paidDate,
                    purchase_product: purchase,
                  };

                  try {
                    const res = request("purchase", "post", payload);
                    if (res) {
                      console.log("Res Purchase : ", res);
                      setPaid("");
                      setPaidDate("");
                      setSupplierId("");
                      setShippingCost("");
                      dispatch(clearAllPurchase());
                      fetchingData();
                    }
                  } catch (error) {
                    console.log(error);
                  }

                  console.log("Item purchase : ", payload);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg text-lg py-6"
              >
                Save Purchase Order
              </Button>
            </div>
          </div>
        </div>

        {/* Purchase History Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Purchase History
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {tbl_head_show_purcahse?.map((item, index) => (
                    <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex justify-center items-center py-12">
                        <Spinner className="size-8" />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {purchases?.length > 0 ? (
                      purchases?.map((item, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-700">{index + 1}</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">${item?.paid}</td>
                          <td className="px-4 py-3 text-slate-600">{item?.paid_date}</td>
                          <td className="px-4 py-3 text-slate-600">${item?.shipping_cost}</td>
                          <td className="px-4 py-3 font-medium text-slate-700">{item?.supplier?.name}</td>
                          <td className="px-4 py-3">
                            {item?.purchase_product?.map((item1, index1) => (
                              <div key={index1} className="mb-2 text-sm bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <div className="font-medium text-slate-800 mb-1">
                                  {index1 + 1}. {item1?.products?.name}
                                </div>
                                <div className="text-slate-600 text-xs space-y-0.5">
                                  <div>Quantity: <span className="font-medium">{item1.qty}</span></div>
                                  <div>Cost: <span className="font-medium">${item1?.cost}</span></div>
                                  <div>Retail Price: <span className="font-medium">${item1.retail_price}</span></div>
                                </div>
                              </div>
                            ))}
                          </td>
                          <td className="px-4 py-3">
                            {item?.purchase_product?.map((item1, index1) => (
                              <div key={index1} className="mb-2">
                                {item1?.product?.image ? (
                                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                                    <img
                                      className="w-full h-full object-cover"
                                      src={item1?.product?.image_url}
                                      alt={`picture : ${item1?.product?.name}`}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                                    <div className="w-full h-full flex justify-center items-center">
                                      <Image className="text-slate-400" size={24} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                          No purchase history found.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
