import PageHead from "../head";
import SearchBar from "../home/search";
import Navbar from "./navbar";

export default function Layout({ children, ...props, }) {

    return (
        <div>
            <PageHead title={props.title && props.title} desc={props.desc && props.desc} />
            <Navbar />
            {children}
        </div>
    );

}