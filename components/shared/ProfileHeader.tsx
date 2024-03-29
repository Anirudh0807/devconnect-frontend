import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  email?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  email,
}: Props) {
  return (
    <>
      <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={imgUrl}
                alt="logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <div className="md:flex gap-4">
                <h2 className="text-left text-heading3-bold text-light-1">
                  {name}
                </h2>
                {email && (
                  <a
                    className="bg-slate-700 rounded-xl px-4 hidden md:block"
                    href={`mailto:${email}`}
                  >
                    <div className="flex gap-2">
                      <EnvelopeClosedIcon className="h-4 w-4 mt-2 text-white" />
                      <p className="text-light-2 mt-1">{email}</p>
                    </div>
                  </a>
                )}
              </div>
              <p className="text-base-medium text-gray-1">@{username}</p>
            </div>
          </div>
          {accountId === authUserId && type !== "Community" && (
            <Link href={`/profile/edit/${accountId}`}>
              <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />

                <p className="text-light-2 max-sm:hidden">Edit</p>
              </div>
            </Link>
          )}
        </div>

      {type !== "Community" && (
        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      )}
      <div className="pt-5 flex justify-center">
        {email && (
          <a
            className="bg-slate-700 rounded-xl px-4 py-1 md:hidden"
            href={`mailto:${email}`}
          >
            <div className="flex gap-2">
              <EnvelopeClosedIcon className="h-4 w-4 mt-1 text-white" />
              <p className="text-light-2">{email}</p>
            </div>
          </a>
        )}
      </div>
      <div className="mt-8 h-0.5 w-full bg-dark-3" />
    </div>
    </>
  );
}

export default ProfileHeader;