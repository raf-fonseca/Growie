'use client';
import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';

interface ListingInfoProps {
    user: SafeUser;
    category: { 
        icon: IconType; 
        label: string; 
        description: string;
    } | undefined;
    description: string;
    plot: number;
    locationValue: string;
}
const ListingInfo = () => {
    return (
        <div>
        
        </div>
    )
}

export default ListingInfo
