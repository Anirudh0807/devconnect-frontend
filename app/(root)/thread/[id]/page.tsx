import ThreadCard from "@/components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  <section className="relative">
    <div>
      <ThreadCard
        id={thread._id}
        currentUserId={user.id}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
      />
    </div>
  </section>;
};

export default Page;
