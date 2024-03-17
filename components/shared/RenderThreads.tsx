import { LoaderIcon } from "lucide-react";
import ThreadCard from "../cards/ThreadCard";

function RenderThreads({ result, user }: any) {
  return (
    <div className="mt-9 flex flex-col gap-10">
      {result ? (
        <div>
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
        </div>
      ) : (
        <LoaderIcon />
      )}
    </div>
  );
}

export default RenderThreads;
