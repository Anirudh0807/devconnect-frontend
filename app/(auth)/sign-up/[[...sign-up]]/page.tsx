import { SignUp, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (user) {
    redirect("/home");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp />
    </div>
  );
}
