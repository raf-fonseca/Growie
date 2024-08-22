import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try {

        const { listingId, userId, authorId } = params;

        const query: any = {}

        // if querying by listingId, all reservations for that listing will be returned
        if (listingId) {
            query.listingId = listingId;
        }

        // if querying by userId, all reservations for that user will be returned
        if (userId) {
            query.userId = userId;
        }

        // if querying by authorId, all reservations for the authors listings will be returned
        if (authorId) {
            query.listing = { userId: authorId}
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            }
        }));

        return safeReservations

    } catch (error: any) {
        throw new Error(error);
    }
    
}