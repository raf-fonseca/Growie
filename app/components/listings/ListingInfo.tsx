'use client';
import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
    user: SafeUser;
    category: { 
        icon: IconType; 
        label: string; 
    } | undefined;
    description: string;
    plot: number;
    locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    plot,
    locationValue
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div >Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div> {plot} sq ft</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

export default ListingInfo
