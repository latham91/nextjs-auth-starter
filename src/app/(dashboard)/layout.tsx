import { Navbar } from "@/components/shared/navbar";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>
      {children}
      </main>
    </>
  );
} 