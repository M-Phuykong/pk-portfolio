import React, { useState } from 'react'

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

    const { theme, updateTheme } = useTheme();

    const [option, setOption] = useState([]);

    function handleSelectChange(event: any) {
        setOption(event.target.value);
        updateTheme(event.target.value);
    }


    return (
    <div>
        <select value={option} onChange={handleSelectChange} name="" id="">
            <option value="bento">
                Bento
            </option>
            <option value="darling">darling</option>
            <option value="aether">aether</option>
            <option value="dark magic girl">dark magic girl</option>
            <option value="thai tea">thai tea</option>

        </select>
    </div>
    );
};