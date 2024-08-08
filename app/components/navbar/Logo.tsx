'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"; // Using this to redirect user to home page when logo is clicked

const Logo = () => {
    const router = useRouter();
  return (
    <Image 
        alt='logo'
        className="hidden md:block cursor-pointer"
        height="175"
        width="175"
        src="/logoMedium.jpeg"
    
    />
  )
}

export default Logo;