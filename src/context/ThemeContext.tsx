import React, { useContext, createContext, useEffect } from "react";


interface Props {
    children ?: React.ReactNode;
}

interface Theme {
        "name": string,
        "background": string,
        "main_color": string,
        "sub_color": string,
        "sub_alt_color": string,
        "text_color": string
};

const themeMap: { [key: string] : Theme} = {
    "bento": {
        "name": "bento",
        "background": "#2d394d",
        "main_color": "#ff7a90",
        "sub_color": "#4a768d",
        "sub_alt_color": "#263041",
        "text_color": "#fffaf8"
    },
    "darling": {
        "name": "darling",
        "background": "#fec8cd",
        "main_color": "#a30000",
        "sub_color": "#ffffff",
        "sub_alt_color": "#f2babd",
        "text_color": "#ffffff"
    },
    "aether": {
        "name": "aether",
        "background": "#101820",
        "main_color": "#cf6bdd",
        "sub_color": "#eedaea",
        "sub_alt_color": "#292136",
        "text_color": "#eedaea"
    },
    "dark magic girl": {
        "name": "dark magic girl",
        "background": "#091f2c",
        "main_color": "#93e8d3",
        "sub_color": "#f5b1cc",
        "sub_alt_color": "#071823",
        "text_color": "#a299d9"
    },
    "thai tea": {
        "name": "thai tea",
        "background": "#fce0c0",
        "main_color": "#bd5620",
        "sub_color": "#412533",
        "sub_alt_color": "#3f2432",
        "text_color": "#412533"
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