import { forwardRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Spinner } from "../ui/spinner";
import { useSelector } from "react-redux";
import { configs } from "@/utils/config/configs";
import { Badge } from "../ui/badge";
import logo from "../../assets/logo.png";

const InvoiceCard = forwardRef((props, ref) => {
  const cart = useSelector((state) => state.cart);
  const tbl_head = [
    "No",
    "Name",
    "Description",
    "Brand",
    "Category",
    "Quantity",
    "Price",
    "discount",
    "Image",
    "Status",
  ];
  return (
    <div ref={ref}>
      <div className="p-7">
        {/* <h1>{Product[0]?.name}</h1> */}
        <div className="flex justify-between items-center">
          <div className="">
            <h1>Invoice : {Date.now()}</h1>
            <h1>Date : {new Date().toLocaleDateString()}</h1>
          </div>
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img className="w-[100%] h-[100%]" src={logo} alt="" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {tbl_head?.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(cart) && cart.length ? (
              <>
                {cart?.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.description}</TableCell>
                    <TableCell>{item?.brand?.name}</TableCell>
                    <TableCell>{item?.category?.name}</TableCell>
                    <TableCell>{item?.qty}</TableCell>
                    <TableCell>${item?.price}</TableCell>
                    <TableCell>{item?.discount}%</TableCell>
                    <TableCell>
                      {item?.image ? (
                        <div className="w-28 h-28 rounded-xl overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={configs.image_url + item?.image}
                            alt={`picture : ${item?.name}`}
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-28 rounded-xl overflow-hidden">
                          <div className="w-full h-full flex justify-center items-center bg-gray-300">
                            <Image />
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {item?.status ? (
                        <Badge
                          className={"text-white bg-blue-700"}
                          variant={"Secondary"}
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge variant={"destructive"}>Inactive</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colspan={13}>
                    <div className="flex justify-center mt-10">No data</div>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

export default InvoiceCard;
