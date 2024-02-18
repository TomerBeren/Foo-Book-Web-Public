import React, { useState, useEffect } from 'react';
import Stories from './Stories';
import CreatePostComponent from '../../../CreatePosts/CreatePostComponent';
import PostHeader from '../../../Posts/PostHeader';
import postsData from '../../../PostData.json';
import EditPostModal from './EditPostModal';

const TimeLine = ({theme}) => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        setPosts(postsData);
    }, []);

    const handleAddNewPost = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const handleDeletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    const handleEdit = (postId) => {
        const postToEdit = posts.find(p => p.id === postId);
        setEditingPost(postToEdit);
    };

    const handleSave = (postId, newText, newFile) => {
        // Find the current post to check if newText or newFile actually represents an update
        const currentPost = posts.find(post => post.id === postId);

        // Check if newText or newFile are provided and different from current
        const isTextUpdated = newText !== "" && newText !== currentPost.text;
        const isFileUpdated = newFile != null; // Assuming newFile would be undefined or null if not provided

        // Only proceed with the update if there's new content to replace old
        if (isTextUpdated || isFileUpdated) {
            if (isFileUpdated) {
                // Simulate uploading the file and getting a new URL
                const newImageUrl = URL.createObjectURL(newFile);
        
                // Update the posts state with the new text and new image URL
                setPosts(prevPosts => prevPosts.map(post => {
                    if (post.id === postId) {
                        return { ...post, text: isTextUpdated ? newText : post.text, imageUrl: newImageUrl };
                    }
                    return post;
                }));
            } else if (isTextUpdated) {
                // If no new file is selected, but text is updated, just update the text
                setPosts(prevPosts => prevPosts.map(post => {
                    if (post.id === postId) {
                        return { ...post, text: newText };
                    }
                    return post;
                }));
            }
        
            // Close the modal after updating
            setEditingPost(null);
        } else {
            // If no changes are made, just close the modal without updating the post
            setEditingPost(null);
        }
    };

    return (
        <div className="col-12 col-lg-6 pb-5">
            <div className="d-flex flex-column justify-content-center w-100 mx-auto" style={{ paddingTop: '50px', maxWidth: '680px' }}>
                <Stories theme={theme}/>
                <CreatePostComponent theme={theme} OnCreatePost={handleAddNewPost} />
                {posts.map((post) => (
                    <PostHeader
                        theme={theme}
                        key={post.id} // Assuming each post has a unique ID
                        profilePic={post.profilePic}
                        author={post.author}
                        timestamp={post.timestamp}
                        text={post.text}
                        imageUrl={post.imageUrl}
                        onEdit={() => handleEdit(post.id)}
                        onDelete={() => handleDeletePost(post.id)}
                    />
                ))}
                {editingPost && (
                    <EditPostModal
                        show={Boolean(editingPost)}
                        onHide={() => setEditingPost(null)}
                        post={editingPost}
                        onSave={handleSave}
                    />
                )}
            </div>
        </div>
    );
};

export default TimeLine;
