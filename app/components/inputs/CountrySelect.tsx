'use client';

import  useCountries  from '../../hooks/useCountries';
import Select from 'react-select';

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;

}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({value, onChange}) => {
    const {getAll} = useCountries();
    return (
        <div>
            <Select 
                placeholder="Select a country"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option:any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div className="">{option.flag}</div>
                        <div>
                            {option.label},
                            <span className="text-neutral-500 ml-1">{
                                option.region}
                            </span>
                        </div>
                        

                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#f3f4f6',
                    }
                })}
                    
            />
        </div>
    )
}

export default CountrySelect
