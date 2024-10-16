import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="You must be logged in to view this page."
            />
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0){
        return (
            <EmptyState 
                title="No Reservations"
                subtitle="There are no reservations made on your plots"
            />
        )
    }

    return (
        <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default ReservationsPage;