import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export async function getStaticProps() {
  const user = await currentUser();

  if (!user) {
    return { props: { userInfo: null } };
  }

  const userInfo = await fetchUser(user.id);

  return {
    props: { userInfo },
    revalidate: 3600, // 1 hour
  };
}

function Page({ userInfo }: any) {
  return (
    <>
      <h1 className="head-text">Create Post</h1>
      {userInfo && <PostThread userId={userInfo._id} />}
    </>
  );
}

export default Page;
