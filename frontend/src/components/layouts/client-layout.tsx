"use client";

import Link from "next/link";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "@/store";
import { usePathname } from "next/navigation";
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
                <Home
                  className={`size-7 ${
                    pathname === "/" ? "text-myindigo" : ""
                  }`}
                />
                <p
                  className={`text-sm  font-bold ${
                    pathname === "/" ? "text-myindigo " : ""
                  }`}
                >
                  Home
                </p>
              </Link>
              {/* MONITORING */}
              <Link
                href="/monitoring"
                className={`flex flex-col items-center space-y-1 transition-transform duration-300 ${
                  pathname === "/monitoring" ? "-translate-y-1" : ""
                }`}
              >
                <div
                  className={`size-12 bg-myindigo rounded-2xl flex items-center justify-center ${
                    pathname === "/monitoring"
                      ? " text-white"
                      : " text-myindigo"
                  }`}
                >
                  <Image
                    src={"/assets/icons/monitoring-logo.svg"}
                    width={30}
                    height={30}
                    className="w-7 h-7"
                    alt="monitoring logo"
                  />
                </div>
                <p
                  className="text-sm font-bold text-myindigo"
                >
                  Monitoring
                </p>
              </Link>

              {/* PROFILE */}
              <Link href="/profile" className="flex flex-col items-center font-bold">
                <User
                  className={`size-7 ${
                    pathname === "/profile" ? "text-myindigo" : ""
                  }`}
                />
                <p
                  className={`text-sm ${
                    pathname === "/profile" ? "text-myindigo " : ""
                  }`}
                >
                  Profile
                </p>
              </Link>
            </header>
          )}
        </div>
      </Provider>
    </>
  );
}
