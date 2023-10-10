import React, { useState, useEffect } from 'react'
import Select from 'react-select'

// Hook
import { useTheme } from '../context/ThemeContext'

function ThemePill({ themeName}: { themeName: string}) {

    return (
    <div className="justify-center my-8 select-none flex">
        {themeName}
    </div>
    )

}

export default function ThemeDropdown() {

    const { theme, updateTheme, themeMap } = useTheme();
    const [selections, setSelections] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        // console.log(themeMap, typeof(themeMap))
        const value = Array.from(Object.keys(themeMap)).map((theme) => {
            return {value: theme, label: theme}
        });

        console.log(value)
        setSelections(value);

    }, [])


    function handleSelectChange(option: Option | null, actionMeta: ActionMeta<Option>) {
        updateTheme(option.value);
    }

    return (
    <div className="ml-3">
        <Select
        options={selections}
        placeholder={theme.name}
        unstyled
        onChange={handleSelectChange}
        />
    </div>
    );
};