import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen sm:grid sm:grid-cols-[16rem_1fr] gap-4 flex">
      <SideNavigation />

      <main className="py-1 flex-1">{children}</main>
    </div>
  );
}
