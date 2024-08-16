'use client';

interface PlotInputProps {
    title: string;
    value: number;
    subtitle: string;
    onChange: (value: number) => void;
}

const PlotInput: React.FC<PlotInputProps> = ({title, subtitle, value, onChange}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10); // Ensure the value is a number
        onChange(newValue);
    };

    return (
        <div className="flex flex-row item-center justify-between">
            <div className="flex flex-col ">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <div className="w-24">
                    <input 
                        type="number" 
                        value={value}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-600 rounded-xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default PlotInput
