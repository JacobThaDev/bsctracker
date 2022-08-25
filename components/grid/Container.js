export default function GridContainer({ children, className }) {

    return(
        <div className={"container "+(className ? className : "")}>
            {children}
        </div>
    )

}