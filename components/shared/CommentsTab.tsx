import { fetchUserReplies } from "@/lib/actions/thread.actions";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function CommentsTab({ currentUserId, accountId, accountType }: Props) {
  const result = await fetchUserReplies(accountId);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.length === 0 ? (
        <p className="no-result"> No Replies</p>
      ) : (
        <div>
          {result.map((thread) => (
            <div className="mt-3">
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={currentUserId}
                parentId={thread.parentId}
                tags={thread.tags || []}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                isComment
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CommentsTab;
