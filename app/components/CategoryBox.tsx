'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import { useCallback } from 'react';
import qs from 'query-string'


interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;

}

const CategoryBox: React.FC<CategoryBoxProps> = ({icon: Icon, label, selected}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) { // if there are parameters 
            currentQuery = qs.parse(params.toString()); // creating an object out of current parameters
        }

        const updatedQuery: any = { 
            ...currentQuery, // copy the parameters of currentQuery
            category: label, // add a 'category' label to the query
        }

        if(params?.get('category') === label) {
            delete updatedQuery.category; // if the category is already selected, remove it. This makes it possible to deselect the category
        }

        const url = qs.stringifyUrl({ // generate a new url with the updated query
            url: '/',
            query: updatedQuery,
        }, {skipNull: true});

        router.push(url);
    }, [label, params, router]);


  return (
    <div 
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
        ${selected ? 'border-b-neutral-800': 'border-transparent'} 
        ${selected ? 'text-neutral-800': 'text-neutral-500'} 
    `}
    >
        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>

    </div>
  )
}

export default CategoryBox
