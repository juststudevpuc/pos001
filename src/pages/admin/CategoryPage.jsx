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
import axios from "axios";
import { Edit, Plus, Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [category, setCategory] = useState([]);
  const [laoding, setLaoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    status: true,
  });

  const fetchingData = async () => {
    setLaoding(true);
    const res = await request("category", "get");
    if (res) {
      console.log("Category Data : ", res);
      setCategory(res?.data);
      setLaoding(false);
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
    console.log("Form Data : ", form);
    try {
      if (isEdit) {
        const res = await request(`category/${form?.id}`, "put", form);
        if (res) {
          console.log("Updated Category : ", res);
          fetchingData();
        }
        setIsEdit(false);
      } else {
        const res = await request("category", "post", form);
        if (res) {
          console.log("Created Category : ", res);
          fetchingData();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsOpen(false);
    setForm({
      id: "",
      name: "",
      description: "",
      status: true,
    });
  };

  const onEdit = (itemEdit) => {
    console.log("Item Edit : ", itemEdit);
    setIsOpen(true);
    setForm(itemEdit);
    setIsEdit(true);
  };
  const onDelete = async (itemDelete) => {
    console.log("Item Delete : ", itemDelete);
    setIsDelete(true);
    setDeleteData(itemDelete);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <h1>Category</h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search category"
          />
          <Button
            onClick={async () => {
              setLaoding(true);
              const res = await request(`category/search/?q=${query}`, "get");
              if (res) {
                console.log("Category Data : ", res?.data);
                setCategory(res?.data);
                setLaoding(false);
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
                {isEdit ? "Update Category" : "Craeate Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} action="">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    value={form?.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                    required
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
                    required
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
              </div>
              <div className="mt-3 flex justify-end">
                <div className="flex gap-5">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      setIsEdit(false);
                      setForm({
                        id: "",
                        name: "",
                        description: "",
                        status: true,
                      });
                    }}
                    type="button"
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Do you want to delete category {deleteData?.name} ?
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3 flex justify-end">
            <div className="flex gap-5 ">
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
                      `category/${deleteData?.id}`,
                      "delete"
                    );
                    if (res) {
                      console.log("Deleted Category : ", res);
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
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              {tbl_head?.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {laoding ? (
              <TableRow>
                <TableCell colspan={7}>
                  <div className="flex justify-center mt-10">
                    <Spinner className={"size-10"} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {category?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.description}</TableCell>
                    <TableCell>
                      {item?.status ? (
                        <Badge
                          variant={"secondary"}
                          className={"bg-blue-700 text-white"}
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge variant={"destructive"}>Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(item?.created_at)}</TableCell>
                    <TableCell>{formatDate(item?.updated_at)}</TableCell>
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
