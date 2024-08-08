'use client';

import axios from "axios";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
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

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {  // data is gonna the FieldValues which are name, email, password
        setIsLoading(true);
        axios.post("/api/register", data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) => {
            toast.error('An error occurred. Please try again later.');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to The Growie"
                subtitle="Create an account!"
                
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
                id="name"
                label="Name"
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
                onClick={() => {}}

            />
            <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}

            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                
                <div className="justify-center flex flex-row items-center gap-2">
                    <div className="">Already have an account?</div>
                    <div 
                        className="text-neutral-800 cursor-pointer hover-underline"
                        onClick={registerModal.onClose} 
                    >
                        Log in
                    </div>
                </div>
                
            </div>
        </div>
        
    )
    return (
        <Modal 
            disabled={isLoading} // If its Loading, the modal is disabled and user cant make any changes
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}   
            body={bodyContent}
            footer={footerContent}



        />
    );
}

export default RegisterModal
