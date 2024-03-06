import Image from "next/image";
import Link from "next/link";

import {
  fetchPosts,
  getLike,
  getLikeLength,
} from "@/lib/actions/thread.actions";
import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";
import CopyButton from "../ui/copyButton";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  tags: string[];
  likes: string[];
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  tags,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  const likes = await getLike(id);

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flex-row">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>

              <div className="flex flex-row gap-2 ml-3">
                {tags?.length > 0 &&
                  tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-light-1 text-small-regular py-[2px] px-2 bg-slate-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <LikeThread
                  likes={likes}
                  threadId={id}
                  currentUserId={currentUserId}
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />

                <CopyButton id={id} />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      <div className="mt-2">
        {!isComment && comments.length > 0 && (
          <div className="ml-1 mb-2 flex items-center gap-2">
            {comments.slice(0, 2).map((comment, index) => (
              <Image
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                width={24}
                height={24}
                className={`${
                  index !== 0 && "-ml-5"
                } rounded-full object-cover`}
              />
            ))}

            <Link href={`/thread/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">
                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
              </p>
            </Link>
          </div>
        )}

        {!isComment && community ? (
          <Link
            href={`/communities/${community.id}`}
            className="mt-5 flex items-center"
          >
            <div className=" flex flex-row gap-2 text-subtle-medium text-gray-1">
              <p>{formatDateString(createdAt)}</p>
              <p>{community && `${community.name} Community`}</p>
            </div>

            <Image
              src={community.image}
              alt={community.name}
              width={14}
              height={14}
              className="ml-1 rounded-full object-cover"
            />
          </Link>
        ) : (
          <div className="flex flex-row gap-2 text-subtle-medium text-gray-1 mt-1">
            <p>{formatDateString(createdAt)}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default ThreadCard;
