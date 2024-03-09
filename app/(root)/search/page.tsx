import ThreadCard from "@/components/cards/ThreadCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchThreadByTag } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) => {
  const user = await currentUser();

  if (!user) return null;
  //console.log(user);

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  console.log(searchParams.searchTerm);

  const search =
    typeof searchParams.searchTerm === "string" ? searchParams.searchTerm : "";

    let posts: any[] = [];

    if (search) {
      posts = await fetchThreadByTag(search, 1, 25);
    }

  return (
    <section>
      {userInfo.isRecruiter ? (
        <div className="pb-8">
          <h1 className="head-text mb-2">Search for candidates</h1>
          <p className="text-heading4-medium text-primary-500">
            with skills you are looking for
          </p>
        </div>
      ) : (
        <h1 className="head-text mb-10">Search</h1>
      )}

      <Searchbar />

      <div className="mt-14 flex flex-col gap-9">
        {posts.length === 0 ? (
          <p className="no-result">No Posts Found</p>
        ) : (
          <>
            {posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                likes={post.likes || []}
                tags={post.tags || []}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
