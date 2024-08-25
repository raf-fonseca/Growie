// Todo: Make titles capitalize
'use client';

import useRentModal from '@/app/hooks/useRentModal'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import PlotInput from '../inputs/PlotInput';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    PRICE = 4
}

const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch, 
        formState: { errors },
        reset

    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            plot: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const plot = watch('plot');
    const imageSrc = watch('imageSrc');

    

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.PRICE) { // if not on the last step
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Listing Created!");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY); // reset to first step
            rentModal.onClose();
        })
        .catch(() => {
            toast.error("An error occurred. Please try again.");
        }).finally (() => {
            setIsLoading(false);
        })

    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }


        return 'Next';
    } , [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title='Which of These Best Describes Your Plot?'
                subtitle='Select a category'

            />
            <div className="grid grid-cols md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick = {(category) => setCustomValue('category', category)} // on click, set the value of the category form field to what was clicked 
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8 ">
                <Heading 
                    title="Where Is Your Plot Located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)} 
                />
                <Map 
                    center={location?.latlng}
                />
            </div>
        )
    }

    if ( step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Share Some Basics About Your Plot"
                    subtitle="How would you describe it?"
                />
                
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="plot"
                    label="Plot size (sq ft)"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />                
            </div>
        )
    }

    if( step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Upload an Image of Your Plot"
                    subtitle="Show off your garden!"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Set Your Price"
                    subtitle="How much would you like to charge per week?"
                />
                <Input 
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }


  return (
    <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} // if on the first step, dont show back button, else show back button
        title="Host your garden"
        body={bodyContent}

    />
  )
}

export default RentModal
