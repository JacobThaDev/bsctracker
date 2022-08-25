export default function GridCol({ children, def, xs, sm, md, lg, xl }) {

    let classes = [];

    if (def)
        classes.push(`col-${def}`);
    if (xs)
        classes.push(`col-xs-${xs}`);
    if (sm)
        classes.push(`col-sm-${sm}`);
    if (md)
        classes.push(`col-md-${md}`);
    if (lg)
        classes.push(`col-lg-${lg}`);
    if (xl)
        classes.push(`col-xl-${xl}`);
    
    return(
        <div className={classes.join(" ")}>
            {children}
        </div>
    )
}