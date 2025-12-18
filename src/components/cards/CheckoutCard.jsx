import { useRef, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { request } from "@/utils/request/request";
import { useDispatch } from "react-redux";
import { clearAllCart } from "@/store/cartSlice";
import InvoiceCard from "./InvoiceCard";
import { useReactToPrint } from "react-to-print";
import { setRefresh } from "@/store/refreshSlice";

export default function CheckoutCard({ data }) {
  const totalItem = data?.reduce((acc, item) => acc + item?.qty, 0);
  const totalOriginal = data?.reduce(
    (acc, item) => acc + Number(item?.qty) * Number(item?.price),
    0
  );
  const totalDiscount = Number(
    data?.reduce(
      (acc, item) =>
        acc +
        ((Number(item?.price) * Number(item?.discount)) / 100) *
          Number(item?.qty),
      0
    )
  ).toFixed(2);

  const total = totalOriginal - totalDiscount;
  const [paid_amount, setPaidAmount] = useState("");
  const [payment_method, setPaymentMethod] = useState("");
  const [remark, setRemark] = useState("");
  const dispatch = useDispatch();
  const ref = useRef();

  const onCheckout = () => {
    const payload = {
      total_amount: total,
      total_paid: paid_amount,
      remark: remark,
      payment_method: payment_method,
      detail: data?.map((item) => ({
        price: item?.price,
        qty: item?.qty,
        product_id: item?.id,
        discount: item?.discount,
        total:
          Number(item?.qty) * Number(item?.price) -
          ((Number(item?.price) * Number(item?.discount)) / 100) *
            Number(item?.qty),
      })),
    };

    console.log("data pay ", payload);
    const res = request("order", "post", payload);
    if (res) {
      console.log("order created : ", res);
      setPaidAmount("");
      setRemark("");
      dispatch(clearAllCart());
      dispatch(setRefresh(true));
    }
  };
  const onPrint = useReactToPrint({
    contentRef: ref, // ✅ Correct for v3+
  });
  return (
    <div className="p-2 bg-gray-100 rounded-xl flex  flex-col gap-2">
      <div className=" flex justify-between border-b">
        <p>Item : </p>
        <p>{totalItem}</p>
      </div>
      <div className=" flex justify-between border-b">
        <p>Total original : </p>
        <p>${totalOriginal}</p>
      </div>
      <div className=" flex justify-between border-b">
        <p>Total discount : </p>
        <p>${totalDiscount}</p>
      </div>
      <div className=" flex justify-between border-b">
        <p>Total : </p>
        <p>${total}</p>
      </div>
      <div className=" flex justify-between gap-3 border-b">
        <Input
          className={"mb-2"}
          value={paid_amount}
          onChange={(e) => setPaidAmount(e.target.value)}
          placeholder="Paid amount "
        />
        <Select
          value={payment_method}
          onValueChange={(value) => setPaymentMethod(value)}
        >
          <SelectTrigger className={"w-full mb-2"}>
            <SelectValue placeholder="Pls select payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aba">ABA</SelectItem>
            <SelectItem value="ac">ACLEDA</SelectItem>
            <SelectItem value="wing">WING</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        placeholder="remark"
      />
      <div className="flex justify-end">
        <Button className="flex mr-2" onClick={onPrint}>Print</Button>
        <Button onClick={onCheckout}>Checkout</Button>
      </div>
      <div className="hidden">
        <InvoiceCard ref={ref} />
      </div>
    </div>
  );
}
