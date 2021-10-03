import React from "react";
import "./../css/loading-anim.css";

function LoadingAnim(){
    return(
    <h1 className="loader">
        <span>{localStorage.getItem('user223')?
        localStorage.getItem('user223'):'Hey'},</span>
        <span>we</span>
        <span>are</span>
        <span>loading</span>
        <span>the</span>
        <span>best</span>
        <span>for</span>
        <span>you</span>
    </h1>
    )
}

export default LoadingAnim;