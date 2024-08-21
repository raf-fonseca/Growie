import prisma from "@/app/libs/prismadb";


export default async function getListings() {
    try{
        
        const listings = await prisma.listing.findMany({ // find all listings
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