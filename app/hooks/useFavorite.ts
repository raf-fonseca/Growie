import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;

}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []; // Get the favoriteIds array from the currentUser object, or an empty array if currentUser is null

        return list.includes(listingId); // Check if the user's favoriteIds array includes the listingId
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        if (!currentUser ){
            return loginModal.onOpen(); // if user tries to favorite something, they must login first 
        }

        try {
            let request;

            if (hasFavorited) {
                request = axios.delete(`/api/favorites/${listingId}`); // if the user has already favorited the listing, delete it from the favoriteIds array
            } else {
                request = axios.post(`/api/favorites/${listingId}`); // if the user has not favorited the listing, add it to the favoriteIds array
            }

            await request;
            router.refresh();
            toast.success("Favourite updated");
        } catch (error) {
            toast.error("Failed to update favourite");
        }

    }, [currentUser, listingId, hasFavorited, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    };
}

export default useFavorite;