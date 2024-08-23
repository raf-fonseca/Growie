import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PlotsClient from "./PlotsClient";

const guestBookingsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="You must be logged in to view this page."
            />
        )
    }

    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0){
        return (
            <EmptyState 
                title="No plots found"
                subtitle="You do not have any plots hosted"
            />
        )
    }

    return (
        <PlotsClient 
            listings={listings}
            currentUser={currentUser}
        />
    )


}

export default guestBookingsPage;