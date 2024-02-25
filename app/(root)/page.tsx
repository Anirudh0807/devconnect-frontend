import { fetchUser } from "@/lib/actions/user.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function Home() {
  //const result = await fetchPosts();
  const user = await currentUser();
  if(!user) redirect('/sign-in');

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");


  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
    </div>
  );
}
