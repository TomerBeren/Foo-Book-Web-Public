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
        // Define the function that fetches data from the server
        const fetchPosts = async () => {
            try {
                // Make an HTTP GET request to the backend server
                const response = await fetch('http://localhost:8080/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the JSON response
                const data = await response.json();
                // Set the posts in state
                setPosts(data.posts);
            } catch (error) {
                console.error('Fetching posts failed:', error);
            }
        };
    
        // Call the function
        fetchPosts();
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
                <Stories theme={theme}/>
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
