import Purchase from "@/components/chart/Purchase";
import PurchaseByMonthChart from "@/components/chart/PurchaseByMonthChart";
import SaleByMonthChart from "@/components/chart/SaleByMonthChart";
import SaleThisMonth from "@/components/chart/SaleThisMonth";
import { request } from "@/utils/request/request";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [purchase, setPurchase] = useState([]);
  const [purchaseByMonth, setPurchaseByMonth] = useState([]);
  const [sale, setSale] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchingData = async () => {
    try {
      setLoading(true);

      const [res, purchaseByMonthRes, saleRes] = await Promise.all([
        request("purchase", "get"),
        request("purchase/summaryPurchase", "get"),
        request("order/getsale", "get"),
      ]);

      setPurchaseByMonth(purchaseByMonthRes?.summary_purchase_by_month || []);
      setSale(saleRes || {});
      setPurchase(res?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h1>

      {loading ? (
        <div className="text-center py-20 text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <div className="space-y-8">

          {/*  Top Stats Cards  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500">
                Purchase Count
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {purchase?.length || 0}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500">
                Total Sale This Month
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                ${sale?.sale_this_month?.total?.toLocaleString() || 0}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500">
                Total Purchase This Month
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                $
                {purchaseByMonth?.find((m) => m.title === "This Month")
                  ?.total?.toLocaleString() || 0}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500">
                Total Yearly Sale
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                $
                {sale?.summary_sale_by_month
                  ?.reduce((sum, m) => sum + m.total, 0)
                  ?.toLocaleString() || 0}
              </p>
            </div>
          </div>

          {/*  Middle Grid: Purchase Chart + Sale This Month  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Purchase data={purchase} />
            </div>

            <div>
              <SaleThisMonth data={sale?.sale_this_month} />
            </div>
          </div>

          {/* Bottom grid (two charts) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PurchaseByMonthChart data={purchaseByMonth} />
            <SaleByMonthChart data={sale?.summary_sale_by_month} />
          </div>
        </div>
      )}
    </div>
  );
}
