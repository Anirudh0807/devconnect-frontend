import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import LandingPage from "./landingPage";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect("/home");
  }
  
  return (
    <>
      <LandingPage/>
    </>
  );
}
