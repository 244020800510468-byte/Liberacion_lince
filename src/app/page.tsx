import { RoleSelector } from "@/components/RoleSelector";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#FAFAFA] px-4 py-12">
      <RoleSelector />
    </div>
  );
}
