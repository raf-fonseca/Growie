import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="You must be logged in to view this page."
            />
        )
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0){
        return (
            <EmptyState 
                title="No Plots"
                subtitle="You have not made any reservations."
            />
        )
    }

    return (
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )


}

export default TripsPage;