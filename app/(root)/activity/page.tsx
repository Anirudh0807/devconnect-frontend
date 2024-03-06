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
  const likes = await getLikesFeed(userInfo._id, user.id);
  console.log(likes);

  return (
    <section>
      <h1 className="head-text-2 mb-20 text-center text-primary-500">Activity</h1>

      <div className="flex flex-col gap-4 md:flex-row justify-around">
        <div className="bg-dark-2 p-8 rounded-lg">
          <h1 className="head-text text-center">Replies</h1>

          <section className="mt-5 flex flex-col gap-2">
            {activity.length > 0 ? (
              <div className="flex flex-col gap-4">
                {activity.map((activity) => (
                  <Link
                    key={activity._id}
                    href={`/thread/${activity.parentId}`}
                  >
                    <article className="activity-card border-solid border-2 border-sky-900">
                      <Image
                        src={activity.author.image}
                        alt={"Profile Picture"}
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                      <p className="!text-medium-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {activity.author.name}
                        </span>
                        replied to your post.
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="!text-base-regular text-light-3">No replies yet</p>
            )}
          </section>
        </div>

        <div className="bg-dark-2 p-8 rounded-lg">
          <h1 className="head-text text-center">Likes</h1>

          <section className="flex mt-5 flex-col gap-5">
            {likes.length > 0 ? (
              <div className="flex flex-col gap-4">
                {likes.map((thread) =>
                  thread.likedBy.reverse().map((like) => (
                    <Link key={like.userId} href={`/thread/${like.threadId}`}>
                      <article className="activity-card border-solid border-2 border-sky-900">
                        <Image
                          src={like.image}
                          alt={"Profile Picture"}
                          width={36}
                          height={36}
                          className="rounded-full object-cover"
                        />
                        <p className="!text-medium-regular text-light-1">
                          <span className="mr-1 text-primary-500">
                            {like.name}
                          </span>
                          has liked your post.
                        </p>
                      </article>
                    </Link>
                  ))
                )}
              </div>
            ) : (
              <p className="!text-base-regular text-light-3">No likes yet</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Page;
