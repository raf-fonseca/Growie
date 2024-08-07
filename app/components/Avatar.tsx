'use client';
import Image from "next/image";

const Avatar = () => {
  return (
    <Image 
        alt='avatar'
        className="rounded-full"
        height="30"
        width="30"
        src="/user.png"
    />
  )
}

export default Avatar
