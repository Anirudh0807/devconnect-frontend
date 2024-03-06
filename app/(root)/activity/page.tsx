import {
  fetchUser,
  getActivity,
  getLikesFeed,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // getActivity
  const activity = await getActivity(userInfo._id);
  const likes = await getLikesFeed(userInfo._id);
  console.log(likes);

  return (
    <section>
      <h1 className="head-text mb-10">Replies</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt={"Profile Picture"}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>
                    replied to your post.
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No replies yet</p>
        )}
      </section>

      <h1 className="head-text my-10">Likes</h1>

      <section className="mt-10 flex flex-col gap-5">
        {likes.length > 0 ? (
          <>
            {likes.map((thread) =>
              thread.likedBy.reverse().map((like) => (
                <Link key={like.userId} href={`/thread/${thread.id}`}>
                  <article className="likes-card flex gap-4 items-center">
                    <Image
                      src={like.image}
                      alt={"Profile Picture"}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">{like.name}</span>
                      has liked your post.
                    </p>
                  </article>
                </Link>
              ))
            )}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No likes yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
