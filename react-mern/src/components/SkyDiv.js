import React from "react";
import BgImage from "../assets/img/auth/login-bg.jpeg";

const SkyDiv = () => {
    return (
    <>
        <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded-left border-light p-4 p-lg-5 h-100 w-100 fmxw-500 my-right-border" style={{ backgroundImage: `url(${BgImage})` }}>
            <div className="mb-5 mt-5">
                {/* <div className="position-relative"> */}
                <h3 className="welcome-text">Welcome!</h3>
                {/* </div> */}
            </div>
        </div>
    </>
    )
};

export default SkyDiv;