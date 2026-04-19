import { AdminRouteGuard } from "@/components/AdminRouteGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#2d2d2d]">
      <AdminRouteGuard>{children}</AdminRouteGuard>
    </div>
  );
}
