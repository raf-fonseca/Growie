'use client';

import { Listing, Reservation } from '@prisma/client';
import { SafeUser, SafeListing } from '@/app/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
    data: SafeListing;
    reservation?: Reservation;
    onAction?: (id: string) => void;    
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation(); // Stop the even from affecting parent elements
            
            if(disabled) {
                return;
            }
            
            onAction?.(actionId);
        }, [actionId, onAction, disabled]);

        // useMemo is used to calculate the price of the listing, ONLY when data.price or reservation changes
        const price = useMemo(() => {
            if(reservation) {
                return reservation.totalPrice;
            }

            return data.price;
        }, [data.price, reservation]);

        const reservationDate = useMemo(() => {
            if (!reservation) {
                return null;
            }

            const start = new Date(reservation.startDate);
            const end = new Date(reservation.endDate);

            return `${format(start, 'PP')} - ${format(end, 'PP')}`;

        }, [reservation]);

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)} // Redirect to the listing's page 
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill 
                        alt="Listing"
                        src={data.imageSrc}
                        className='object-cover h-full w-full group-hover:scale-110 transition'
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}   
                        />
                    </div>
                </div>
                {/* LOCATION */}
                <div className="text-lg">
                    {location?.region}, {location?.label}
                </div>
                {/* CATEGORY     */}
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>

                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        ${price} CAD
                    </div>
                    {!reservation && (
                        <div className="font-light">
                            per week
                        </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button 
                        onClick={handleCancel}
                        small 
                        label={actionLabel}
                        disabled={disabled}
                    />
                )}
            </div>

        </div>
    )
}

export default ListingCard
