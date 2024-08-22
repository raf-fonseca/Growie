'use client';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useEffect, useMemo } from 'react';
import { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { eachDayOfInterval,differenceInCalendarDays } from 'date-fns';
import { useState } from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Range } from 'react-date-range';
import ListingReservation from '@/app/components/listings/ListingReservation';



const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & { user: SafeUser};
    currentUser: SafeUser | null;
}

const ListingClient:React.FC<ListingClientProps> = ({listing, reservations = [], currentUser}) => {

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        })

        return dates;
    },[reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen(); 
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Reservation created successfully');
            setDateRange(initialDateRange);
            //Redirect to /trips
            router.refresh();
        })
        .catch(() => {
            toast.error('Failed to create reservation');
        })
        .finally(() => {
            setIsLoading(false);
        })
    },[totalPrice, dateRange, currentUser, listing?.id, loginModal, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const weekCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate) / 7;

            if (weekCount && listing.price) {
                const calculatedPrice = weekCount * listing.price;
                setTotalPrice(Math.round(calculatedPrice * 100) / 100); // Rounds to the nearest cent
            } else {
                setTotalPrice(Math.round(listing.price * 100) / 100); // Rounds to the nearest cent
            }
        }
    }, [dateRange, listing.price]);


    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 ">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            plot={listing.plot}
                            locationValue={listing.locationValue}
                            
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation 
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
