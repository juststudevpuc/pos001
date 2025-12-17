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
import { Edit, ImageUp, Plus, Search, SearchSlash, Trash } from "lucide-react";
import { cache, useEffect, useState } from "react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Document,
  Image,
  Page,
  pdf,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import logo from "../../assets/logo.png";

export default function SupplierPage() {
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    website: "",
  });

  const fetchingData = async () => {
    setLoading(true);
    const res = await request("supplier", "get");
    if (res) {
      console.log("Response Supplier : ", res);
      setSupplier(res?.data);
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
    "Email",
    "Address",
    "Tel",
    "Website",
    "Created at",
    "Updated at",
    "Action",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const res = await request(`supplier/${form?.id}`, "put", form);
        if (res) {
          console.log("Updated Supplier : ", res);
          fetchingData();
        }
        setIsEdit(false);
      } else {
        const res = await request("supplier", "post", form);
        if (res) {
          console.log("Created Supplier : ", res);
          fetchingData();
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Form Data : ", form);
    setIsOpen(false);

    setForm({ id: "", name: "", email: "", address: "", website: "" });
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

  const onExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(supplier);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Supplier Listt");
    const ExcelBuff = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([ExcelBuff]), "SupplierList.xlsx");
  };

  const onImportExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const binaryStr = event.target.result;
        const workSheet = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workSheet.SheetNames[0];
        const sheet = workSheet.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log("Data Sheet : ", jsonData);

        try {
          const res = await request("supplier/bulk", "post", {
            suppliers: jsonData,
          });
          if (res) {
            console.log("Created Supplier : ", res);
            fetchingData();
          }
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const styles = StyleSheet.create({
    page: { flexDirection: "column", backgroundColor: "#f9f9f9", padding: 20 },
    header: {
      fontSize: 16,
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "bold",
    },
    subHeader: {
      fontSize: 12,
      textAlign: "center",
      color: "#777",
      marginBottom: 5,
    },
    table: {
      display: "flex",
      flexDirection: "column",
      borderWidth: 1,
      borderColor: "#ddd",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      padding: 5,
    },
    tableHeader: {
      fontWeight: "bold",
      fontSize: 10,
      flex: 1,
      textAlign: "center",
      backgroundColor: "#f2f2f2",
    },
    tableCell: {
      fontSize: 8,
      flex: 1,
      textAlign: "center",
      paddingVertical: 8,
    },
    logo: { width: 60, height: 60, alignSelf: "center", borderRadius: "100" },
    footer: { marginTop: 20, fontSize: 10, textAlign: "center", color: "#777" },
  });

  const MyDocument = ({ data }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.header}>Sak</Text>
          <Text style={styles.subHeader}>Supplier Report</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              {["No", "Name", "Address", "Email", "Website"].map(
                (head, idx) => (
                  <Text key={idx} style={styles.tableHeader}>
                    {head}
                  </Text>
                )
              )}
            </View>

            {data?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.address}</Text>
                <Text style={styles.tableCell}>{item.email}</Text>
                <Text style={styles.tableCell}>{item.website}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footer}>Thank you for your business!</Text>
        </Page>
      </Document>
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <h1>Supplier</h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Supplier"
          />
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await request(`supplier/search/?q=${query}`, "get");
              if (res) {
                console.log("Response Supplier : ", res);
                setSupplier(res?.data);
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
          <Button onClick={onExportExcel}>Export Excel</Button>
          <Label className={"border rounded-lg py-2.5 px-3"}>
            <div className="w-23">Upload Excel</div>
            <Input
              onChange={onImportExcel}
              className={"hidden"}
              type={"file"}
            />
          </Label>
          <Button
            onClick={async () => {
              try {
                const blob = await pdf(<MyDocument data={supplier} />).toBlob();
                saveAs(blob, "SupplierList.pdf");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Download PDF
          </Button>
          <Button
            onClick={() => {
              setIsPDF(true);
            }}
          >
            View PDF
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
                {isEdit ? "Update Supplier" : "Create Supplier"}
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
                  <Label>Email</Label>
                  <Input
                    value={form?.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Address</Label>
                  <Input
                    value={form?.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Address"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Tel</Label>
                  <Input
                    value={form?.tel}
                    onChange={(e) => setForm({ ...form, tel: e.target.value })}
                    placeholder="Tel"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>website</Label>
                  <Input
                    value={form?.website}
                    onChange={(e) =>
                      setForm({ ...form, website: e.target.value })
                    }
                    placeholder="website"
                  />
                </div>

                <div className="flex justify-end">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        setForm({
                          id: "",
                          name: "",
                          email: "",
                          address: "",
                          website: "",
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
                      `supplier/${deleteData?.id}`,
                      "delete"
                    );
                    if (res) {
                      console.log("Deleted Supplier : ", res);
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

      <Dialog open={isPDF} onOpenChange={setIsPDF}>
        <DialogContent className={"max-w-5xl h-[90vh]"}>
          <DialogHeader>
            <DialogTitle>View PDF</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[80vh]">
            {isPDF && (
              <PDFViewer width={"100%"} height={"100%"}>
                <MyDocument data={supplier} />
              </PDFViewer>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-7">
        {/* <h1>{Supplier[0]?.name}</h1> */}

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
                <TableCell colspan={9}>
                  <div className="flex justify-center mt-10">
                    <Spinner className={"size-7"} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {supplier?.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.address}</TableCell>
                    <TableCell>{item?.tel}</TableCell>
                    <TableCell>
                      <a target="_blank" href={item?.website}>
                        {item?.website}
                      </a>
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
