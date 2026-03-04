"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthToken } from "@/lib/http";
import { OpsSidebar } from "@/components/layout/OpsSidebar";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // TEMP: allow entering Ops without login while backend auth is being adjusted.
    // Set NEXT_PUBLIC_BYPASS_LOGIN=false to restore normal behavior.
    if (process.env.NEXT_PUBLIC_BYPASS_LOGIN !== "false") {
      setIsAuthorized(true);
      return;
    }

    const token = getAuthToken();
    if (!token && !pathname.includes("/login")) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[320px_1fr]">
      <OpsSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
