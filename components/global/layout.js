import Footer from "./footer";
import PageHeader from "./header";
import Navbar from "./navbar";
import PageHead from "./pagehead";

export default function Layout({ children, title, desc }) {

    return (
        <>
            <PageHead title={title} desc={desc}/>
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
    
}