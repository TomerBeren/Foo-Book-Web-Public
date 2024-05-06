import React from "react";
import Avatar from "../CreatePosts/Avatar";
import PostContent from "./PostContent";
import PostOptionsMenu from "./PostOptionsMenu";


const PostHeader = ({ timestamp, text, imageUrl, onEdit, onDelete, theme , author, profilepic, onUserClick, postId, likeCount, userLiked}) => {
   
    return (
        <div className={`p-4 rounded shadow mt-3 mb-2 ${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`}>
            <div className="d-flex justify-content-between">
                <div className="d-flex" onClick={onUserClick}>
                    <Avatar src={profilepic} alt="avatar"/>
                    <div>
                        <p type="button" className="m-0 fw-bold">{author}</p>
                        <span className="text-muted fs-7">{timestamp}</span>
                    </div>
                </div>
                <PostOptionsMenu onEdit={onEdit} onDelete={onDelete} />
            </div>

            <PostContent theme={theme} text={text} imageUrl={imageUrl} postId={postId} userLiked={userLiked} likeCount={likeCount} />
        </div>
    );
};

export default PostHeader;