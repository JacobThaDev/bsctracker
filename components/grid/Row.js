export default function GridRow({ children, className }) {

    return(
        <div className={`row ${className ? className : ""}`}>
            {children}
        </div>
    )
}