import React, { useContext, createContext } from "react";

interface Props {
    children ?: React.ReactNode;
}

interface ThemeContextInterface {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContextState = {
    darkMode: false,
    setDarkMode: () => {}
}

const ThemeContext = createContext<ThemeContextInterface>(ThemeContextState);

export function ThemeProvider({ children } : Props ) {

    const [darkMode, setDarkMode] = React.useState<boolean>(false);

    return (
        <ThemeContext.Provider
        value={{darkMode, setDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext)
}