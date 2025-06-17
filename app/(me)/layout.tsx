import Header from "@/components/header";

export const dynamic = "force-dynamic";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-5 flex flex-col min-h-screen">
      <Header />
      <main className="w-full max-w-[750px] mx-auto">
      {children}
      </main>
    </div>
  );
}
