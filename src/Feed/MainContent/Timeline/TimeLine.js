import React, { useState, useEffect } from 'react';
import Stories from './Stories';
import CreatePostComponent from '../../../CreatePosts/CreatePostComponent';
import PostHeader from '../../../Posts/PostHeader';
import EditPostModal from './EditPostModal';

const TimeLine = ({ theme }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [token,setToken] = useState(localStorage.getItem('token'));
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

    const handleDeletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    const handleEdit = (postId) => {
        const postToEdit = posts.find(p => p.id === postId);
        setEditingPost(postToEdit);
    };

    const handleSave = (postId, newText, newFile, isPictureRemoved) => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                // Check for text update
                const updatedText = newText !== "" ? newText : post.text;
                // If picture is removed, set imageUrl to null or an empty string, otherwise handle newFile
                const updatedImageUrl = isPictureRemoved ? null : (newFile ? URL.createObjectURL(newFile) : post.imageUrl);
                return { ...post, text: updatedText, imageUrl: updatedImageUrl };
            }
            return post;
        }));
        setEditingPost(null);
    };


    return (
        <div className="timeline-container col-12 col-md-6">
            <div className="d-flex flex-column justify-content-center w-100 mx-auto" style={{ paddingTop: '50px', maxWidth: '680px' }}>
                <Stories theme={theme} />
                <CreatePostComponent theme={theme} OnCreatePost={handleAddNewPost} />
                {posts.map((post) => (
                    <PostHeader
                        theme={theme}
                        key={post.id}
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
