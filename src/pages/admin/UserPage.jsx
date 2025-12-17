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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, Trash, Search, Users, Filter } from "lucide-react";
import { useState } from "react";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
    role: "user",
  });

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const table_head = ["#", "Username", "Role", "Status", "Actions"];

  const roles = [
    { value: "admin", label: "Administrator", variant: "destructive" },
    { value: "user", label: "User", variant: "default" },
    { value: "moderator", label: "Moderator", variant: "secondary" },
    { value: "editor", label: "Editor", variant: "outline" },
  ];

  function onSubmit(e) {
    e.preventDefault();

    if (isEdit) {
      setData((prev) =>
        prev.map((item) => (item.id === form.id ? { ...form } : item))
      );
      setIsEdit(false);
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }

    setIsOpen(false);
    resetForm();
  }

  const onEdit = (itemEdit) => {
    setIsEdit(true);
    setForm(itemEdit);
    setIsOpen(true);
  };

  const onDelete = (itemDelete) => {
    setData(data.filter((item) => item.id !== itemDelete.id));
  };

  const resetForm = () => {
    setForm({
      id: "",
      username: "",
      password: "",
      role: "user",
    });
  };

  const getRoleVariant = (role) => {
    const roleObj = roles.find(r => r.value === role);
    return roleObj?.variant || "default";
  };

  const dataFilter = data.filter(
    (item) =>
      (item.username.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase())) &&
      (roleFilter === "all" || item.role === roleFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
              <p className="text-slate-600 mt-1">Manage your team members and their roles</p>
            </div>
          </div>

          <Button 
            onClick={() => setIsOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>

        {/* Stats and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Users</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{data.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {roles.map((role) => (
            <Card key={role.value} className="bg-white border shadow-sm">
              <CardContent className="p-6">
                <div>
                  <p className="text-sm font-medium text-slate-600">{role.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {data.filter(user => user.role === role.value).length}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter section */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users..."
                    className="pl-10 bg-slate-50 border-slate-200"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-48">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="text-sm text-slate-500">
                {dataFilter.length} of {data.length} users
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dialog form */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {isEdit ? "Edit User" : "Create New User"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-4 mt-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input
                    id="username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    placeholder="Enter username"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter password"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                  <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {isEdit ? "Update User" : "Create User"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Table section */}
        <Card className="bg-white border shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-lg font-semibold">Users List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  {table_head.map((head, index) => (
                    <TableHead key={index} className="font-semibold text-slate-700">
                      {head}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataFilter.length > 0 ? (
                  dataFilter.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell className="font-medium text-slate-600">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {item.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{item.username}</p>
                            <p className="text-xs text-slate-500">Active</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleVariant(item.role)}>
                          {roles.find(r => r.value === item.role)?.label || item.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(item)}
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDelete(item)}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 border-red-200 text-red-500"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">No users found</p>
                      <p className="text-slate-400 text-sm mt-1">
                        {data.length === 0 ? "Get started by adding your first user." : "Try adjusting your search or filter."}
                      </p>
                      {data.length === 0 && (
                        <Button 
                          onClick={() => setIsOpen(true)} 
                          className="mt-4 bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}