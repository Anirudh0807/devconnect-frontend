"use client";
import { sidebarLinks, sidebarRecruiterLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBarButtons({ userId, isRecruiter }: any) {
  const pathname = usePathname();
  return (
    <>
      {isRecruiter ? (
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
          {sidebarRecruiterLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            if (link.route === "/profile")
              link.route = `${link.route}/${userId}`;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}

          <div
            className={"leftsidebar_link_hidden display:none"}
          >
            <Image src={sidebarLinks[4].imgURL} alt={sidebarLinks[4].label} width={24} height={24} />

            <p className="text-light-1 max-lg:hidden">{sidebarLinks[4].label}</p>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            if (link.route === "/profile")
              link.route = `${link.route}/${userId}`;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default SideBarButtons;
