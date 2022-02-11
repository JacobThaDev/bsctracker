
import PageHead from "./global/head";
import PageNav from "./global/navigation";
import Footer from "./global/footer";
import TopNav from "./global/topnav";

export default function Layout({ children, ...props }) {
    
    return (
        <>
            <PageHead title={props.title}/>
            <TopNav/>
            <PageNav/>

            {children}

            <Footer/>
        </>
    )
    
}