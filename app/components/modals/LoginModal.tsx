'use client';

import axios from "axios";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { toast } from "react-hot-toast";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
            
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {  // data is gonna the FieldValues which are name, email, password
        setIsLoading(true);
        signIn('credentials', {
            ...data, // credentials specified in pages/api/auth/[...nextauth].ts
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);
            if(callback?.ok){
                toast.success("Logged in successfully");
                router.refresh();
                loginModal.onClose();
                
            } 

            if (callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome Back"
                subtitle="Log in to your account"
                
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>    
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 ">
            <hr />
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}

            />
            <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}

            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                
                <div className="justify-center flex flex-row items-center gap-2">
                    <div className="">First time user?</div>
                    <div 
                        className="text-neutral-800 cursor-pointer hover-underline"
                        onClick={toggle} 
                    >
                        Create an account
                    </div>
                </div>
                
            </div>
        </div>
        
    )
    return (
        <Modal 
            disabled={isLoading} // If its Loading, the modal is disabled and user cant make any changes
            isOpen={loginModal.isOpen}
            title="Log in"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}   
            body={bodyContent}
            footer={footerContent}



        />
    );
}

export default LoginModal
