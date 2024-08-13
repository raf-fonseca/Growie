// TODO: add more categories
'use client';

import Container from '../Container'
import { FaSunPlantWilt } from 'react-icons/fa6'
import { GiGreenhouse, GiFruitTree, GiGrapes, GiLilyPads } from 'react-icons/gi'
import { PiBarn } from 'react-icons/pi'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    {
        label: 'Greenhouse',
        icon: GiGreenhouse,
    },
    {
        label: 'Garden',
        icon: FaSunPlantWilt,
    },
    {
        label: 'Farm',
        icon: PiBarn,
    },
    {
        label: 'Orchard',
        icon: GiFruitTree,
    },
    {
        label: 'Vineyard',
        icon: GiGrapes,
    },
    {
        label: 'Aquaponic',
        icon: GiLilyPads,
    },
    

]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category'); 
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }




    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
            
        </Container>
    )
}

export default Categories
