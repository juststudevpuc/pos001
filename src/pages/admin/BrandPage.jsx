import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/helper/format";
import { request } from "@/utils/request/request";
import { Edit, Plus, Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function BrandPage() {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    status: true,
  });

  const fetchingData = async () => {
    setLoading(true);
    const res = await request("brand", "get");
    if (res) {
      console.log("Response brand : ", res);
      setBrand(res?.data);
      setForm({ id: "", name: "", description: "", status: true });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const tbl_head = [
    "No",
    "Name",
    "Description",
    "Status",
    "Created at",
    "Updated at",
    "Action",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const res = await request(`brand/${form?.id}`, "put", form);
        if (res) {
          console.log("Updated Brand : ", res);
          fetchingData();
        }
        setIsEdit(false);
      } else {
        const res = await request("brand", "post", form);
        if (res) {
          console.log("Created Brand : ", res);
          fetchingData();
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Form Data : ", form);
    setIsOpen(false);

    setForm({ id: "", name: "", description: "", status: true });
  };

  const onEdit = (itemEdit) => {
    console.log("Item Edit", itemEdit);
    setIsOpen(true);
    setIsEdit(true);
    setForm(itemEdit);
  };

  const onDelete = async (itemDelete) => {
    console.log("Item Delete", itemDelete);
    setDeleteData(itemDelete);
    setIsDelete(true);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <h1>Brand</h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand"
          />
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await request(`brand/search/?q=${query}`, "get");
              if (res) {
                console.log("Response brand : ", res);
                setBrand(res?.data);
                setLoading(false);
              }
            }}
          >
            <Search />
          </Button>
          <Button
            onClick={() => {
              fetchingData();
              setQuery("");
            }}
          >
            <SearchSlash />
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {" "}
                {isEdit ? "Update brand" : "Create brand"}
              </DialogTitle>
            </DialogHeader>
            <form action="" onSubmit={onSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    value={form?.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Description</Label>
                  <Input
                    value={form?.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Description"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Status</Label>
                  <Select
                    value={String(form?.status)}
                    onValueChange={(value) =>
                      setForm({ ...form, status: value == "true" })
                    }
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Pls select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        setForm({
                          id: "",
                          name: "",
                          description: "",
                          status: true,
                        });
                        setIsEdit(false);
                      }}
                      type="button"
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
                  </div>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to delete {deleteData?.name}?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end">
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setDeleteData(null);
                  setIsDelete(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const res = await request(
                      `brand/${deleteData?.id}`,
                      "delete"
                    );
                    if (res) {
                      console.log("Deleted Brand : ", res);
                      fetchingData();
                      setDeleteData(null);
                      setIsDelete(false);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
                variant={"destructive"}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-7">
        {/* <h1>{brand[0]?.name}</h1> */}

        <Table>
          <TableHeader>
            <TableRow>
              {tbl_head?.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colspan={7}>
                  <div className="flex justify-center mt-10">
                    <Spinner className={"size-7"} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {brand?.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.description}</TableCell>
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
                    <TableCell> {formatDate(item?.created_at)}</TableCell>
                    <TableCell> {formatDate(item?.updated_at)}</TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <Button onClick={() => onEdit(item)}>
                          <Edit />
                        </Button>
                        <Button
                          onClick={() => onDelete(item)}
                          variant={"destructive"}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
