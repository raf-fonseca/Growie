'use client';

import useRentModal from '@/app/hooks/useRentModal'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

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
            season: '',
            imageSrc: '',
            price: 1,
            title: '',
            description: '',


        }
    });

    const category = watch('category');
    const location = watch('location');
    const plot = watch('plot');

    const decapitalize = str => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
    

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
                title='Which of these best describes your plot?'
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
                    title="Where is your plot located?"
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

    if( step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    // title={`Tell us about your ${category} plot`}
                    title="Share some basics about your plot"
                    subtitle={`How do you care for your ${decapitalize(category)}`}
                />
                <Counter 
                    title="Plot size"
                    subtitle="How big is your plot? (sq ft)"
                    value={plot}
                />
            </div>
        )
    }


  return (
    <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} // if on the first step, dont show back button, else show back button
        title="Host your garden"
        body={bodyContent}

    />
  )
}

export default RentModal
