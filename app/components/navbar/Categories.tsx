// TODO: add more categories
'use client';

import Container from '../Container'
import { FaSunPlantWilt } from 'react-icons/fa6'
import { GiGreenhouse } from 'react-icons/gi'
import { PiBarn } from 'react-icons/pi'
import CategoryBox from '../CategoryBox'

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

]

const Categories = () => {
  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox 
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                />
            ))}
        </div>
           
    </Container>
  )
}

export default Categories
