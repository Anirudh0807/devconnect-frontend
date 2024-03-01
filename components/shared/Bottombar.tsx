import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import BottomBarButtons from "./BottomBarButtons";

async function Bottombar() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  return (
    <section className="bottombar">
      <BottomBarButtons isRecruiter={userInfo.isRecruiter} />
    </section>
  );
}

export default Bottombar;
