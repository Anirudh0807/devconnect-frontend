import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function Home() {
  const result = await fetchPosts(1, 30);
  console.log(result);

  const user = await currentUser();
  if(!user) redirect('/sign-in');

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");


  return (
    <div>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Posts found</p>
        ) : (
          <>
            {result.posts.map((post) => {
              <ThreadCard
               key={post.id}
               id={post.id}
               currentUserId={user?.id}
               ParentId={post.parentId}
               author={post.author}
               community={post.community}
               createdAt={post.createdAt}
               comments={post.children}
              />
            })}
          </>
        )}
      </section>
    </div>
  );
}
