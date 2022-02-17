import FontIcon from "./global/fonticon";
import PageHead from "./global/head";

export default function Loader() {

    return(
        <>
            <PageHead title="Loading" />
            <div className="d-flex align-items-center text-center w-100 vh-100 text-muted">
                <div className="flex-fill">
                    <FontIcon
                        type="fad" 
                        className="mb-4"
                        size="5x"
                        icon="spinner" 
                        pulse={true}/>

                    <h3>Loading data...please wait</h3>
                    <p>Please wait while we fetch your data.</p>
                </div>
            </div>
        </>
        
    )
}