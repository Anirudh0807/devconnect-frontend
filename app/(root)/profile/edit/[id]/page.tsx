import EditCard from "@/components/forms/EditCard";
import { fetchUser } from "@/lib/actions/user.actions";

const page = async ({ params }: { params: { id: string } }) => {
  const userInfo = await fetchUser(params.id);

  return <EditCard id={params.id} userInfo={userInfo} />;
};

export default page;