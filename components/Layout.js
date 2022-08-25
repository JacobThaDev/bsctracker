import PageMeta from "./global/PageMeta";

export default function Layout({ children, title, desc }) {

    return(
        <>
            <PageMeta title={title} desc={desc}/>
            {children}
        </>
    )
}