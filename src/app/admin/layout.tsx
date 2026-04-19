import { AdminRouteGuard } from "@/components/AdminRouteGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-lince-admin">
      <AdminRouteGuard>{children}</AdminRouteGuard>
    </div>
  );
}
