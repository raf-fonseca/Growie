import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    plot?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;

}

export default async function getListings(params: IListingsParams) {
    try{
        const {
            userId,
            plot,
            startDate,
            endDate,
            locationValue,
            category

        } = params;

        let query: any = {};

        // If userId is provided, filter by userId
        if (userId){
            query.userId = userId;
        }

        if (category){
            query.category = category;
        }

        if (plot) {
            query.plot = {
                gte: +plot // greater than or equal to the plot
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }



        const listings = await prisma.listing.findMany({ // find all listings
            where: query, 
            orderBy: {
                createdAt: 'desc'
            },
            
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    }
    catch (error: any){
        throw new Error(error.message);
    }
}

// Database operationgs like querying data are not instantanious. Instead, they return a promise. 
// The await keyword is used to wait for the promise to resolve (when the data has been reached)
// A Promise is an object representing the eventual completion or failure of an asynchronous operation.