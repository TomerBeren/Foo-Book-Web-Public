import React from "react";
import Avatar from "../CreatePosts/Avatar";
import PostContent from "./PostContent";
import PostOptionsMenu from "./PostOptionsMenu";

const PostHeader = ({ profilePic, author, timestamp, text, imageUrl, onEdit, onDelete, theme }) => {
    return (
        <div className={`p-4 rounded shadow mt-3 mb-2 ${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`}>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <Avatar src={profilePic} alt="avatar" />
                    <div>
                        <p className="m-0 fw-bold">{author}</p>
                        <span className="text-muted fs-7">{timestamp}</span>
                    </div>
                </div>
                <PostOptionsMenu onEdit={onEdit} onDelete={onDelete} />
            </div>

            <PostContent theme={theme} text={text} imageUrl={imageUrl} />
        </div>
    );
};

export default PostHeader;