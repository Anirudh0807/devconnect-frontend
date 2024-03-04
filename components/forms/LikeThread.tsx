"use client";

import {
  getLikeLength,
  likeThread,
  unlikeThread,
} from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  likes: string[];
}

function LikeThread({ threadId, currentUserId, likes }: Props) {
  const [liked, setLiked] = useState(likes.includes(currentUserId));

  const [num, setNum] = useState(likes.length);

  const handleLike = async () => {
    if (liked) {
      await unlikeThread(threadId, currentUserId);
      const likeLength = await getLikeLength(threadId);
      console.log(likeLength);
      setNum(likeLength);
      setLiked(false);
    } else {
      await likeThread(threadId, currentUserId);
      const likeLength = await getLikeLength(threadId);
      console.log(likeLength);
      setNum(likeLength);
      setLiked(true);
    }
  };
  return (
    <div className="flex flex-row justify-center items-center gap-1">
      <Image
        src={liked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={handleLike}
      />

      {num > 0 && <p className="text-light-1 text-subtle-medium">{num}</p>}
    </div>
  );
}

export default LikeThread;
