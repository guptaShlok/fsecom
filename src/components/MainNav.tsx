"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const params = useParams();
  const pathName = usePathname();
  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      Active: pathName === `/${params.storeId}/settings`,
    },
  ];
  return (
    <>
      {routes.map((route, index) => (
        <Link
          className={cn(
            ` rounded-md text-sm font-medium ${
              route.Active
                ? " text-black dark:text-white"
                : " text-muted-foreground"
            }`,
            className
          )}
          key={index}
          href={route.href}
        >
          {route.label}
        </Link>
      ))}
    </>
  );
};

export default MainNav;
