import React from "react";
import { Card, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const PosCard = ({ data }) => {
  return (
    <div className="">
      <Card className={"p-4 flex flex-col gap-3"}>
        <div className="w-full rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={data?.image_url}
            alt={data?.name}
          />
        </div>
        <div className="font-bold">{data?.name}</div>
        <div className="flex gap-1 flex-col text-muted-foreground">
          <p>{data?.description}</p>
          <div className="flex gap-3 ">
            <strong>{data?.brand?.name}</strong> |
            <strong>{data?.category?.name}</strong> |
            <strong>
              {data?.status ? (
                <Badge
                  className={"text-white bg-blue-700"}
                  variant={"Secondary"}
                >
                  Active
                </Badge>
              ) : (
                <Badge variant={"destructive"}>Inactive</Badge>
              )}
            </strong>
          </div>
          <div className="mt-2 flex gap-3">
            <strong>Price: ${data?.price}</strong> |
            <strong>Qty: {data?.qty}</strong> |
            <strong>Discount: {data?.discount}% </strong>
          </div>
        </div>
        <Separator />
        <div className=" flex gap-2 flex-col">
          <Button onClick={() => data?.addToCart(data)}>Add to Cart</Button>
          <Button>Detail</Button>
        </div>
      </Card>
    </div>
  );
};

export default PosCard;
