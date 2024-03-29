import ThreadCard from "@/components/cards/ThreadCard";
import RenderThreads from "@/components/shared/RenderThreads";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { ClerkLoading, UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const result = await fetchPosts(1, 30);

  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div>
      <h1 className="head-text text-left">Home</h1>

      {result ? (
        <section className="mt-9 flex flex-col gap-10">
          {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
          ) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  tags={post.tags || []}
                  likes={post.likes || []}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )}
        </section>
      ) : (
        <ClerkLoading />
      )}
    </div>
  );
}
