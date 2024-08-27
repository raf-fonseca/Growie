import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        plot,
        location,
        price,
    } = body;

    let listing 
    try {
        listing = await prisma.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                plot: parseInt(price, 10),
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id,
            }
        });
        console.log("Listing created successfully:", listing);
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.error(); // Optionally, you could return an error response
    }
    
    return NextResponse.json(listing);

}