import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
    listingId: string;
}

const ListingPage = async ( { params }: {params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState 
                title="Listing Not Found"
                subtitle="The listing you are looking for does not exist."
            />
        )
    }
    return (
        <div>
            <ListingClient 
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </div>
    )
}

export default ListingPage
