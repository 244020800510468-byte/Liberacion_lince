import { AdminRouteGuard } from "@/components/AdminRouteGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#ebe4d8]">
      <AdminRouteGuard>{children}</AdminRouteGuard>
    </div>
  );
}
