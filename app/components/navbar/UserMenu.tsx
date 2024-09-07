'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null;  
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal(); 
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value); // Reversing the value of isOpen
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
        }

        if (currentUser){
            rentModal.onOpen();
        }
    }, [currentUser, loginModal, rentModal]);
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                        Host your garden 
                </div>
                <div 
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                        <AiOutlineMenu size={20} />
                        <div className="hidden md:block ">
                            <Avatar src={currentUser?.image}/>
                        </div>
                    </div>
            </div>

            {isOpen && ( // If isOpen is true, then render the following div
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                            {/* TODO: fix the names of the router.push() accordingly */}
                                <MenuItem 
                                    onClick={() => router.push('/favorites')}
                                    label="Favourites"
                                />
                                <MenuItem 
                                    onClick={() => router.push('/trips')}
                                    label="My Bookings"
                                />
                                <MenuItem 
                                    onClick={() => router.push('/reservations')}
                                    label="Guest Bookings"
                                />
                                <MenuItem 
                                    onClick={() => router.push('/my-plots')}
                                    label="My Plots"
                                />
                                <MenuItem 
                                    onClick={rentModal.onOpen}
                                    label="Host my garden"
                                />
                                <hr />
                                <MenuItem 
                                    onClick={() => signOut()}
                                    label="Log out"
                                />
                    
                            </>
                        ): (
                            <>
                                <MenuItem 
                                    onClick={loginModal.onOpen}
                                    label="Log in"
                                />
                                <MenuItem 
                                    onClick={registerModal.onOpen} // TODO: Login after signing up 
                                    label="Sign Up"
                                />
                        
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
