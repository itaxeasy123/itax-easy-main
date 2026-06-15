"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/partials/loading/Loader";

const Home = dynamic(() => import("./Home"), {
  ssr: false,
  // Fill the viewport while the landing page loads so the footer doesn't
  // jump up under an empty page.
  loading: () => (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Loader />
    </div>
  ),
});

export default function HomeClient() {
  return <Home />;
}
