import React from "react";
import LikesAndComments from "./LikesAndComments";

const PostContent = ({ text, imageUrl, theme }) => {
    return (
        <div className="mt-3">
            {/* content */}
            <p>{text}</p>
            <img src={imageUrl} alt="" className="img-fluid" />
            {/* likes and comments */}
            <LikesAndComments theme={theme} />
        </div>
    );
}

export default PostContent;