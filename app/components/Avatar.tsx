'use client';
import Image from "next/image";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image 
        alt='avatar'
        className="rounded-full"
        height="30"
        width="30"
        src={src || "/user.png"}
    />
  )
}

export default Avatar
