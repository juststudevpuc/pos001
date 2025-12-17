import { AnimatePresence, motion } from "framer-motion";
import { Box, ChartBar, Home, Menu, Receipt, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../assets/logo.png";
import { request } from "@/utils/request/request";
import { setToken } from "@/store/tokenSlice";
import { logout } from "@/store/userSlice";

const Sidebar = ({ isOpen, setIsOpen, setIsOpenDesktop, isOpenDesktop }) => {
  const nav_item = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <ChartBar />,
    },
    {
      to: "/brand",
      label: "Brand",
      icon: <User />,
    },
    {
      to: "/product",
      label: "Product",
      icon: <Box />,
    },
    {
      to: "/category",
      label: "Category",
      icon: <Box />,
    },
    {
      to: "/pos",
      label: "Pos",
      icon: <Receipt />,
    },
    {
      to: "/supplier",
      label: "Supplier",
      icon: <Receipt />,
    },
    {
      to: "/purchase",
      label: "Purchase",
      icon: <Receipt />,
    },
  ];

  return (
    <div>
      {/* Desktop */}
      <AnimatePresence>
        {isOpenDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden md:block fixed left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-r border-white/10"
          >
            <div className="flex py-4 px-4 border-b border-white/10 justify-end">
              <button
                onClick={() => setIsOpenDesktop(false)}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <X className="text-white" />
              </button>
            </div>

            <div className="flex p-4 flex-col gap-3">
              {nav_item.map((item) => (
                <NavLink
                  to={item.to}
                  key={item.to}
                  className={({ isActive }) =>
                    `group px-4 py-3 rounded-xl flex items-center gap-3 transition-all
                     ${
                       isActive
                         ? "bg-blue-600 text-white shadow-xl"
                         : "bg-white/10 text-white hover:bg-white/20"
                     }`
                  }
                >
                  <span className="opacity-80 group-hover:opacity-100">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.25 }}
            className="fixed left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl md:hidden z-50"
          >
            <div className="flex py-3 px-4 border-b border-white/10 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <X className="text-white" />
              </button>
            </div>

            <div className="flex p-4 flex-col gap-3">
              {nav_item.map((item) => (
                <NavLink
                  to={item.to}
                  key={item.to}
                  className={({ isActive }) =>
                    `group px-4 py-3 rounded-xl flex items-center gap-3 transition-all
                     ${
                       isActive
                         ? "bg-blue-600 text-white shadow-xl"
                         : "bg-white/10 text-white hover:bg-white/20"
                     }`
                  }
                >
                  <span className="opacity-80 group-hover:opacity-100">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState(true);

  const token = useSelector((state) => state.token.value);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !user?.email || !token) {
      return navigate("/auth/login");
    }
  }, [token, user, useSelector]);

  if (!user || !user?.email || !token) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        isOpenDesktop={isOpenDesktop}
        setIsOpen={setIsOpen}
        setIsOpenDesktop={setIsOpenDesktop}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpenDesktop ? "md:ml-64" : ""
        }`}
      >
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/70 border-b border-gray-200 px-5 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <button
            onClick={() => setIsOpenDesktop(!isOpenDesktop)}
            className="hidden md:inline-flex p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
          >
            <Menu />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
          >
            <Menu />
          </button>

          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-gray-700">{user?.name}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-[42px] h-[42px] rounded-full overflow-hidden ring-2 ring-gray-200 shadow">
                  <img src={logo} alt="" className="w-full h-full" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-xl rounded-xl">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      const res = request("auth/logout");
                      if (res) {
                        dispatch(setToken(""));
                        dispatch(logout());
                        navigate("auth/login");
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="bg-white shadow-inner rounded-xl m-4 p-6 min-h-[80vh]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
