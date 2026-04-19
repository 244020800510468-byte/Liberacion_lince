import { StudentRouteGuard } from "@/components/StudentRouteGuard";

export default function EstudianteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentRouteGuard>{children}</StudentRouteGuard>;
}
