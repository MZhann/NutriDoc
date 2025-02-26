"use client";

// import { AppSidebar } from "@/components/shadcn-custom/sidebar/app-sidebar";
import Link from "next/link";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "@/store";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
// import BreadCrumbs from "../shadcn-custom/breadcrumps";
import { Home, User } from "lucide-react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // В будущем, страницы которые требуют запуска без сайдбара буду добавлять сюда
  const isNoSidebarPage =
    /^\/(register|login|greating|verify-email|reset-password|forgot-password|privacy-policy|offer-agreement|cookie-policy)$/.test(
      pathname
    );

  return (
    <>
      <Provider store={store}>
        <div className="min-h-[100vh] md:min-h-min">
          {children}

          {!isNoSidebarPage && (
            <header className="bg-white w-full fixed bottom-0 h-24 flex justify-between px-8 items-center text-mylightgraytext border-t-2">
              <Link href={"/"} className="flex flex-col items-center">
                <Home className="size-7" />
                <p className="text-sm">Home</p>
              </Link>
              <Link
                href={"/monitoring"}
                className="flex flex-col items-center space-y-1"
              >
                <div className="size-12 bg-myindigo rounded-2xl flex items-center justify-center">
                  <Image
                    src={"/assets/icons/monitoring-logo.svg"}
                    width={30}
                    height={30}
                    className="w-7 h-7"
                    alt="monitoring logo"
                  />
                </div>
                <p className="text-myindigo font-bold text-sm">Monitoring</p>
              </Link>
              <Link href={"/profile"} className="flex flex-col items-center">
                <User className="size-7" />
                <p className="text-sm">Profile</p>
              </Link>
            </header>
          )}
        </div>
      </Provider>
    </>
  );
}
