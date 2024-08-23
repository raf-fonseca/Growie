'use client'

import Container from "@/app/components/Container";
import { SafeListing, SafeUser } from "../types"
import Heading from "@/app/components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface PlotsClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;

}

const PlotsClient: React.FC<PlotsClientProps> = ({ listings, currentUser}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Listing deleted');
            router.refresh();
        })
        .catch(() => {
            toast.error('An error occurred');
        })
        .finally(() => {
            setDeletingId('');
        })

    }, [router]);


    return (
        <Container>
            <Heading 
                title="My Plots"
                subtitle="View your hosted plots"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard 
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete plot"
                        currentUser={currentUser}
                    />
                ))}
            </div>

        </Container>
    )
}

export default PlotsClient
