import React from "react";
import "./../css/showerror.css";

function ShowError(props){
    return(
        <>
            <div className="main-container">
                <div className="error-card">
                    <h3>Oh, Something is not Good!</h3>
                    <p className="error-message">
                        {props.message}
                    </p>
                    <h5 className="close-button" onClick={props.onclose}>close</h5>
                </div>
            </div>
        </>
    );
}

export default ShowError;