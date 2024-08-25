'use client';

import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { CountrySelectValue } from '../inputs/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import CountrySelect from '../inputs/CountrySelect';
import Calendar from '../inputs/Calendar';
import Input from '../inputs/Input';


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2

}

const SearchModal = () => {
    const router = useRouter();
    const searchModal = useSearchModal();
    const params = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [plotSize, setPlotSize] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }
        setIsLoading(true);
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            plotSize,
        };

        if (dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);

    }, [step, location, plotSize, dateRange, params, router, searchModal, onNext]);


    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';
        }
        return 'Next';

    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Where Do You Want to Growie?"
                subtitle="Select a location"
            />
            <CountrySelect 
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="When Do You Want To Growie?"
                    subtitle="Select a date"
                />
                <Calendar 
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="How Big Do You Need To Growie?"
                    subtitle="Select a size"
                />
                
                <Input 
                    id="plot"
                    label="Plot size (sq ft)"
                    type="number"
                    disabled={isLoading}
                    required
                />    
            </div>
        )
    }

    return (
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default SearchModal
