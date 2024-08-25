import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";


const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return (
            <EmptyState 
                title="No Favourites Yet"
                subtitle="You can add your favorite gardens to this page."
            />
        )
    }

    return (
        <FavoritesClient 
            listings={listings}
            currentUser={currentUser}
        />
    )
    
}

export default ListingPage;