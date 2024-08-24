import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    plotSize?: number;
    startDate?: string;
    endDate?: string;

}

export default async function getListings(params: IListingsParams) {
    try{
        const { userId } = params;

        let query: any = {};

        // If userId is provided, filter by userId
        if (userId){
            query.userId = userId;
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
        throw new Error(error);
    }
}

// Database operationgs like querying data are not instantanious. Instead, they return a promise. 
// The await keyword is used to wait for the promise to resolve (when the data has been reached)
// A Promise is an object representing the eventual completion or failure of an asynchronous operation.