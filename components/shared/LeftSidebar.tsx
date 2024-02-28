import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import SideBarButtons from "./SideBarButtons";
import SignedOutParts from "./SignedOutParts";
async function LeftSidebar() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  return (
    <section className="custom-scrollbar leftsidebar">
      <SideBarButtons userId={user.id} isRecruiter={userInfo.isRecruiter} />
      <SignedOutParts />
    </section>
  );
}

export default LeftSidebar;
