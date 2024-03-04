"use client";
import { sidebarLinks, sidebarRecruiterLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BottomBarButtons({ isRecruiter }: any) {
  const pathname = usePathname();

  return (
    <>
      {isRecruiter ? (
        <div className="bottombar_container">
          {sidebarRecruiterLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${isActive && "bg-primary-500"}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className="text-subtle-medium text-light-1 max-sm:hidden">
                  {link.label.split(/\s+./)[0]}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bottombar_container">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${isActive && "bg-primary-500"}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className="text-subtle-medium text-light-1 max-sm:hidden">
                  {link.label.split(/\s+./)[0]}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default BottomBarButtons;
