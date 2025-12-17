import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { request } from "@/utils/request/request";

export default function RegisterPage() {
  const [validate, setValidate] = useState({});
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    password_confirmation: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await request("register", "post", {
        ...form,
        password_confirmation: form?.password,
      });

      if (res?.error) {
        if (res?.errors) {
          setValidate(res?.errors);
        }
        return;
      }

      if (res) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Sign Up
        </h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Username</Label>
            <Input
              className="rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form?.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your username"
            />
            {validate?.name && (
              <p className="text-sm text-red-500">{validate?.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              className="rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form?.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
            />
            {validate?.email && (
              <p className="text-sm text-red-500">{validate?.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              className="rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form?.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
            />
            {validate?.password && (
              <p className="text-sm text-red-500">{validate?.password[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 transition"
          >
            Register
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-lg hover:bg-gray-100 transition"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-indigo-600 hover:underline transition"
          >
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}
