import React, { useContext, createContext, useEffect } from "react";

interface Props {
    children ?: React.ReactNode;
}

export interface Theme {
        "name": string,
        "background": string,
        "main_color": string,
        "sub_color": string,
        "sub_alt_color": string,
        "text_color": string
};


const themeMap: { [key: string] : Theme} = {
    "8008": {
        "name": "8008",
        "background": "#333a45",
        "main_color": "#f44c7f",
        "sub_color": "#939eae",
        "sub_alt_color": "#000000",
        "text_color": "#e9ecf0"
    },
    "aether": {
        "name": "aether",
        "background": "#101820",
        "main_color": "#cf6bdd",
        "sub_color": "#eedaea",
        "sub_alt_color": "#292136",
        "text_color": "#eedaea"
    },
    "bento": {
        "name": "bento",
        "background": "#2d394d",
        "main_color": "#ff7a90",
        "sub_color": "#4a768d",
        "sub_alt_color": "#263041",
        "text_color": "#fffaf8"
    },
    "cyberspace": {
        "name": "cyberspace",
        "background": "#181c18",
        "main_color": "#00ce7c",
        "sub_color": "#9578d3",
        "sub_alt_color": "#131613",
        "text_color": "#c2fbe1"
    },
    "dark magic girl": {
        "name": "dark magic girl",
        "background": "#091f2c",
        "main_color": "#93e8d3",
        "sub_color": "#f5b1cc",
        "sub_alt_color": "#071823",
        "text_color": "#a299d9"
    },
    "darling": {
        "name": "darling",
        "background": "#fec8cd",
        "main_color": "#a30000",
        "sub_color": "#ffffff",
        "sub_alt_color": "#f2babd",
        "text_color": "#ffffff"
    },
    "milkshake": {
        "name": "milkshake",
        "background": "#ffffff",
        "main_color": "#212b43",
        "sub_color": "#62cfe6",
        "sub_alt_color": "#ddeff3",
        "text_color": "#62cfe6"
    },
    "thai tea": {
        "name": "thai tea",
        "background": "#fce0c0",
        "main_color": "#bd5620",
        "sub_color": "#412533",
        "sub_alt_color": "#3f2432",
        "text_color": "#412533"
    },
    "vscode": {
        "name": "vscode",
        "background": "#1e1e1e",
        "main_color": "#007acc",
        "sub_color": "#4d4d4d",
        "sub_alt_color": "#191919",
        "text_color": "#d4d4d4"
    }
}

const initTheme = Object.keys(themeMap)[Math.floor(Math.random() * Object.keys(themeMap).length)];

// Type for the context
// This is basically the type for all the value we're passing down
// to all the props that are using it
interface ThemeContextInterface {
    theme: Theme;
    updateTheme: (theme: string) => void;
    themeMap: { [key: string] : Theme};
}

// The initial value for it
const InitThemeContext = {
    theme: themeMap[initTheme],
    updateTheme: (theme: string) => {},
    themeMap: themeMap
}

const ThemeContext = createContext<ThemeContextInterface>(InitThemeContext);

export function ThemeProvider({ children } : Props ) {

    const [theme, setTheme] = React.useState<Theme>(themeMap[initTheme]);

    useEffect(() => {
        setTheme(themeMap[initTheme]);
    }, [])


    function updateTheme(theme: string) {
        return setTheme(themeMap[theme]);
    }

    return (
        <ThemeContext.Provider
        value={{theme, updateTheme, themeMap}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext)
}