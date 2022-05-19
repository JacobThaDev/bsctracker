import '../public/css/globals.css';
import '../public/css/main.css';
import { globalCss, createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import NextNProgress from "nextjs-progressbar";

const lightTheme = createTheme({ 
    type: 'light', 
    theme: {
        colors: {
            background: '#EFEFEF',
            
            primary: "#5e72e4",
            primaryLight: "#4756AC",
            primaryShadow: "#5e72e4",
            
            success: "#62af66",
            successLight: "#2C4C2C",
            successShadow: "#62af66",

            error: "#f8716c",
            errorLight: "#5B2828",
            errorShadow: "#f8716c",

            warning: "#f0ad4e",
            warningLight: "#563A0C",
            warningShadow: "#f0ad4e",

            //gradient: "linear-gradient(310deg,#5e72e4,#825ee4)"
        },
        shadows: {
            md: "0 .125rem .25rem rgba(0,0,0,.075)"
        }
    }
})

const darkTheme = createTheme({ 
    type: 'dark',
    
    theme: {
        colors: {
            background: '#13131b',
            backgroundContrast: '#191923',
            backgroundAlt: "#5591955",

            primary: "#5e72e4",
            primaryLight: "#4756AC",
            primaryShadow: "#5e72e4",
            
            success: "#62af66",
            successLight: "#2C4C2C",
            successShadow: "#62af66",

            error: "#f8716c",
            errorLight: "#5B2828",
            errorShadow: "#f8716c",

            warning: "#f0ad4e",
            warningLight: "#563A0C",
            warningShadow: "#f0ad4e",

            //gradient: "linear-gradient(310deg,#5e72e4,#825ee4)"
        },

        shadows: {
            md: "0 .125rem .25rem rgba(0,0,0,.075)"
        }
    }
})

const globalStyles = globalCss({
    html: { height: "100%" }
});

function MyApp({ Component, pageProps }) {
    globalStyles();

    return (
        <>
        <NextNProgress />
        <NextThemesProvider
            defaultTheme="dark"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className
            }}>
            <NextUIProvider>
                <Component {...pageProps} />
            </NextUIProvider>
        </NextThemesProvider>
        </>
    );
}

export default MyApp;