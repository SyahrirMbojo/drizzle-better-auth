import { ReactNode } from "react";
import Navbar from "./navbar";
import { getServerSession } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      {children}
    </div>
  );
}
