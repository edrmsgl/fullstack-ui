'use client';
import Menu from "@/components/menu";
import TopBar from "@/components/topbar";
export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-1/8">
        <Menu />
      </div>
      <div className="w-7/8 bg-rightSide p-5">
        <TopBar />
        {children}</div>
    </div>
  );
}