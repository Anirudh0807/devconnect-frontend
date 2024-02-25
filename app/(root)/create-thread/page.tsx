import Post from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  //TODO: Add onboarding
  // if(!userInfo?.onboarded) redirect('/onboarding')

  return (
    <>
      <h1 className="head-text">Create Post</h1>

      <Post 
      userId={userInfo._id}/>
    </>
  );
}

export default Page;
