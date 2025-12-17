import CartCard from "@/components/cards/CartCard";
import CheckoutCard from "@/components/cards/CheckoutCard";
import PosCard from "@/components/cards/PosCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addItemCart, clearAllCart } from "@/store/cartSlice";
import { setRefresh } from "@/store/refreshSlice";
import { request } from "@/utils/request/request";
import {
  Search,
  RotateCcw,
  Trash2,
  ShoppingCart,
  Package,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PosPage() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const refresh = useSelector((state) => state.refresh.value);

  const fetchingData = async () => {
    setLoading(true);
    const res = await request("products", "get");

    if (res) {
      console.log("Response Product : ", res);
      setProduct(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
    if (refresh) {
      fetchingData();
      dispatch(setRefresh(false));
    }
  }, [refresh]);

  const addToCart = (itemAddToCart) => {
    console.log("add to cart:", itemAddToCart);
    dispatch(addItemCart(itemAddToCart));
  };

  const handleSearch = async () => {
    setLoading(true);
    const res = await request(`products/search/?q=${query}`, "get");
    if (res) {
      console.log("Response Product : ", res);
      setProduct(res?.data);
      setLoading(false);
    }
  };

  const handleReset = () => {
    fetchingData();
    setQuery("");
  };

  const totalItem = cart?.reduce((acc, item) => acc + item?.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 -m-6 p-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Point of Sale
              </h1>
              <p className="text-sm text-slate-500">
                Select products and manage your cart
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search products..."
                className="pl-10 pr-4 py-2.5 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl px-4 py-2.5 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Search size={20} />
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-slate-300 hover:bg-slate-100 rounded-xl px-4 py-2.5 transition-all duration-200"
            >
              <RotateCcw size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Package className="text-blue-600" size={22} />
              <h2 className="text-lg font-semibold text-slate-800">
                Available Products
              </h2>
              <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {products.length} items
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <Spinner className="size-10 text-blue-600" />
                <p className="mt-4 text-slate-500">Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {products.map((item, index) => (
                  <PosCard
                    key={index}
                    data={{ ...item, addToCart: () => addToCart(item) }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Package size={64} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try adjusting your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6 sticky top-24">
            {/* Cart Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-slate-500">{totalItem} items</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(clearAllCart())}
                disabled={!cart?.length}
                className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="Clear cart"
              >
                <Trash2
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-3 mb-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {Array.isArray(cart) && cart.length ? (
                cart.map((item, index) => (
                  <CartCard key={index} data={item} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={32} className="opacity-50" />
                  </div>
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1">Add products to get started</p>
                </div>
              )}
            </div>

            {/* Checkout Section */}
            {cart?.length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <CheckoutCard data={cart} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}