import '../public/css/themes/light.css';
import '../public/css/themes/dark.css';
import '../public/css/grid.css';
import '../public/css/globals.css';
import '../public/css/main.css';

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import NextNProgress from "nextjs-progressbar";
import { TrackerProvider } from '../context/tracker';
import { Toaster } from 'react-hot-toast';


const darkTheme   = createTheme({ type: 'dark' });
const lightTheme  = createTheme({ type: 'light' });

function MyApp({ Component, pageProps }) {

    return (
        <>
            <div><Toaster/></div>
            <NextNProgress />
            <NextThemesProvider
                defaultTheme="dark"
                attribute="class"
                value={{
                    dark: darkTheme.className,
                    light: lightTheme.className
                }}>
                <NextUIProvider>
                    <TrackerProvider>
                        <Component {...pageProps} />
                    </TrackerProvider>
                </NextUIProvider>
            </NextThemesProvider>
        </>
    );
}

export default MyApp;