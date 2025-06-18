import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { ArrowShuffle } from 'akar-icons'

// Hook
import { Theme, useTheme } from '../context/ThemeContext'

const ThemePill = ({ value, label, color}:{ value: string, label: string, color: any})  => (

    <div className="flex items-center my-2 min-w-full"
    style={{color: color.main}}>
        {value}

        <div className='flex outline outline-[0.25rem] ml-2 gap-1 bg-white rounded-full items-center'
        style={{
            outlineColor: color.sub_alt_color,
            background  : color.sub_alt_color,
        }}>
            <div className="w-3 h-3 rounded-full" style={{background: color.text_color }}></div>
            <div className="w-3 h-3 rounded-full" style={{background: color.main_color }}></div>
            <div className="w-3 h-3 rounded-full" style={{background: color.sub_color }}></div>
        </div>
    </div>
);

export default function ThemeDropdown() {

    const { theme, updateTheme, themeMap } = useTheme();
    const [selections, setSelections] = useState<{value: string, label: string, color: Theme}[]>([]);

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
    <div className="ml-3 flex items-center py-2" >
        <ArrowShuffle strokeWidth={2} size={16}
        className='mr-2 cursor-pointer'
        style={{color: theme.main_color}}
        onClick={randomizeColor}/>

        <div className='w-64'>
            <Select
            value={{value: theme.name, label: theme.name, color: theme}}
            formatOptionLabel={ThemePill}
            options={selections}
            isSearchable={false}
            unstyled
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
            onChange={handleSelectChange}
            styles={{
                menu: (baseStyles, state) => ({
                    ...baseStyles,
                    background: theme.background,
                    borderColor: theme.sub_alt_color,
                    borderWidth: '5px',
                    borderStyle: 'solid',
                    borderRadius: '15px',
                    padding: '1rem',
                }),
            }}
            />
        </div>

    </div>
    );
};