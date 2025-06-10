import Header from "@/components/header";

export const dynamic = "force-dynamic";

export default function TabsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        <Header/>
        {children}
      </>
    );
  }
  