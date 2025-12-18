import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* VIDEO HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/bmw.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-5xl font-semibold text-white mb-4">
              Modern POS for Auto Business
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Manage sales, inventory, and analytics with confidence.
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-200 px-10"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>

              <Button
                size="lg"
                // variant="outline"
                className="bg-white/10 text-white px-10"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
      

      {/* MAIN CONTENT */}
      <div className="flex items-center justify-center py-20">
        <div className="max-w-6xl w-full px-6">
          <div className="bg-white rounded-2xl shadow-lg p-12">

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
                <h3 className="text-slate-900 font-medium text-lg mb-2">
                  Fast Checkout
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Complete sales quickly with a smooth and intuitive checkout process.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
                <h3 className="text-slate-900 font-medium text-lg mb-2">
                  Inventory Management
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Monitor stock levels and manage products in real time.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
                <h3 className="text-slate-900 font-medium text-lg mb-2">
                  Reports & Analytics
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Understand your business performance through clear reports.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-16 text-slate-400 text-sm">
              © {new Date().getFullYear()} POS System. All rights reserved.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
