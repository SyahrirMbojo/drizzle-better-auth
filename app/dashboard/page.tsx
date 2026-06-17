import React from "react";
import BtnLogout from "./btn-logout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-15">
      <h1>Dashboard Page</h1>
      <div className="text-md">
        {session?.user.name} | {session?.user.email}
      </div>
      <BtnLogout />
    </div>
  );
}
