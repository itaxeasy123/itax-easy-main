"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/partials/loading/Loader";

const SuperAdminDashboard = dynamic(
  () =>
    import(
      "@/components/pagesComponents/dashboard/superAdmin/mainBoard/SuperAdmin_dashboard"
    ),
  {
    ssr: false, // 🔥 MOST IMPORTANT
    loading: () => (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader />
      </div>
    ),
  }
);

export default function Page() {
  return <SuperAdminDashboard />;
}
