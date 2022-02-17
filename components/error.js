import FontIcon from "./global/fonticon";
import PageHead from "./global/head";

export default function ErrorPage({ ...props }) {

    return (
        <>
            <PageHead title="Loading" />
            <div className="d-flex align-items-center text-center w-100 vh-100 text-muted">
                <div className="flex-fill">
                    <FontIcon
                        type="far" 
                        className="mb-4 text-danger"
                        size="5x"
                        icon="exclamation-triangle" />

                    <h3>
                        <span className="text-danger fw-bold">500</span> | An Error Occurred
                    </h3>
                    <p>
                        An error occurred processing your request. Please refer to the console <br/>for the exact reason and report it to 
                        <a href="mailto:admin@bsctracker.net" className="ms-1">BscTracker</a>
                    </p>
                </div>
            </div>
        </>
    )
}