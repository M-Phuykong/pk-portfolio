import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { ArrowShuffle } from 'akar-icons'

// Hook
import { useTheme } from '../context/ThemeContext'

const ThemePill = ({ value, label, color}:{ value: string, label: string, color: any})  => (

    <div className="flex items-center my-2 w-96">
        {value}

        <div className='flex ml-2 bg-white rounded-full items-center' >
            <div className="w-2 h-2 rounded-full p-2" style={{background: color.background }}></div>
            <div className="w-2 h-2 rounded-full p-2" style={{background: color.main_color }}></div>
            <div className="w-2 h-2 rounded-full p-2" style={{background: color.sub_color }}></div>
        </div>
    </div>
);

export default function ThemeDropdown() {

    const { theme, updateTheme, themeMap } = useTheme();
    const [selections, setSelections] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        // console.log(themeMap, typeof(themeMap))
        const value = Array.from(Object.keys(themeMap)).map((theme) => {
            return {value: theme, label: theme, color: themeMap[theme]}
        });

        setSelections(value);

    }, [])


    function handleSelectChange(option: Option | null, actionMeta: ActionMeta<Option>) {
        updateTheme(option.value);
    }

    function randomizeColor() {
        const randomTheme = Object.keys(themeMap)[Math.floor(Math.random() * Object.keys(themeMap).length)];
        updateTheme(randomTheme);
    }

    return (
    <div className="ml-3 flex items-center" >
        <ArrowShuffle strokeWidth={2} size={16}
        className='mr-2 cursor-pointer'
        onClick={randomizeColor}/>

        <Select
        formatOptionLabel={ThemePill}
        options={selections}
        placeholder={theme.name}
        isSearchable={false}
        unstyled
        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
        onChange={handleSelectChange}
        />
    </div>
    );
};