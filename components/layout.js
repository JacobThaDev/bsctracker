import PageHead from "./global/head";
import PageNav from "./global/navigation";
import Footer from "./global/footer";

export default function Layout({ children, ...props }) {
    
    return (
        <>
            <PageHead title={props.title}/>
            <PageNav/>

            {children}

            <Footer/>
        </>
    )
    
}