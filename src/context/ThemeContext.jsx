import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(() => {

        const savedTheme = localStorage.getItem('darkMode');

        return savedTheme === 'true';
    });


    useEffect(() => {

        localStorage.setItem(
            'darkMode',
            darkMode
        );

        document.body.className =
            darkMode ? 'dark' : 'light';

    }, [darkMode]);


    const toggleTheme = () => {

        setDarkMode((previousMode) => !previousMode);

    };


    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};