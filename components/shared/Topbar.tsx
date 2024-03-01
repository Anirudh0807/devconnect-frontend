import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import { fetchUser } from "@/lib/actions/user.actions";

async function Topbar() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  return (
    <nav className="topbar">
      <Link href={"/"} className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading4-medium md:text-heading3-bold text-light-1 max-sx:hidden">
          DevConnect
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block pr-3 md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {userInfo.isRecruiter ? (
          <UserButton
            appearance={{
              baseTheme: dark,
              elements: {
                userButtonBox: "py-2 px-2",
              },
            }}
          />
        ) : (
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "py-2 px-2",
              },
            }}
          />
        )}
      </div>
    </nav>
  );
}

export default Topbar;
