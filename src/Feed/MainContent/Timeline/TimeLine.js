import React, { useState, useEffect } from 'react';
import Stories from './Stories';
import CreatePostComponent from '../../../CreatePosts/CreatePostComponent';
import PostHeader from '../../../Posts/PostHeader';
import EditPostModal from './EditPostModal';

const TimeLine = ({ theme }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}/posts`, {
                    method: 'GET', // Specify the method explicitly
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(Array.isArray(data) ? data : []);
                console.log(posts)
            } catch (error) {
                console.error('Fetching posts failed:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleAddNewPost = async (newPost) => {

        if (userId === "" || token === "") {
            console.error('User ID or token is missing');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Assuming Bearer token authentication
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Failed to create new post');
            }

            const createdPost = await response.json();
            // Optionally update local state or UI based on response
            setPosts(prevPosts => [createdPost, ...prevPosts]);
        } catch (error) {
            console.error('Error creating new post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            // Assuming `userId` is available in the scope. If not, you might need to retrieve it similarly to how you get `postId`
            const response = await fetch(`http://localhost:8080/api/users/${userId}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    const handleEdit = (postId) => {
        const postToEdit = posts.find(p => p._id === postId);
        console.log("Editing post ID:", postId);
        setEditingPost(postToEdit);
    };

    const handleSave = async (postId, newText, newFile, isPictureRemoved) => {
        let updatedImageUrl;
        console.log("Editing post ID:", postId);
        if (isPictureRemoved) {
            updatedImageUrl = null; // Image is removed
        } else if (newFile) {
            // Convert the file to base64 first
            updatedImageUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(newFile);
            });
        }

        // Prepare the payload for the API call
        const payload = {
            text: newText,
            imageUrl: updatedImageUrl,
        };

        // Filter out undefined properties if no update is needed for them
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

        try {
            const response = await fetch(`http://localhost:8080/api/Users/${userId}/posts/${postId}`, {
                method: 'PATCH', // or 'PUT', depending on your backend requirements
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            const updatedPost = await response.json();

            // Update local state to reflect the change
            setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, ...updatedPost } : post));
            setEditingPost(null); // Assuming you use this to reset the editing state
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };



    return (
        <div className="timeline-container col-12 col-md-6">
            <div className="d-flex flex-column justify-content-center w-100 mx-auto" style={{ paddingTop: '50px', maxWidth: '680px' }}>
                <Stories theme={theme} />
                <CreatePostComponent theme={theme} OnCreatePost={handleAddNewPost} />
                {posts.map((post) => (
                    <PostHeader
                        theme={theme}
                        key={post._id}
                        timestamp={post.createdAt}
                        text={post.text}
                        imageUrl={post.imageUrl}
                        onEdit={() => handleEdit(post._id)}
                        onDelete={() => handleDeletePost(post._id)}
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
