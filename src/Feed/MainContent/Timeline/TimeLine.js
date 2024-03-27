import React, { useState, useEffect } from 'react';
import Stories from './Stories';
import CreatePostComponent from '../../../CreatePosts/CreatePostComponent';
import PostHeader from '../../../Posts/PostHeader';
import EditPostModal from './EditPostModal';
import NonFriendProfile from './NonFriendProfile';
import { useUser } from '../../../UserContext';

const TimeLine = ({ theme }) => {
    const [userId] = useState(localStorage.getItem('userId'))
    const [token] = useState(localStorage.getItem('token'));
    const { userDetails } = useUser();
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [showNonFriendProfile, setNonFriendProfile] = useState(false);
    const [clickedUserInfo, setClickedUserInfo] = useState(null)

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const combinedPosts = [...data.friendsPosts, ...data.nonFriendsPosts];
            setAllPosts(combinedPosts);
            setPosts(combinedPosts);
        } catch (error) {
            console.error('Fetching posts failed:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [userDetails]);

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
            const response = await fetch(`http://localhost:8080/api/users/${userId}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred while trying to delete the post');
            }
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
            alert(data.message); // Alert success message
        } catch (error) {
            console.error('Error deleting post:', error);
            alert(error.message); // Alert the error message from the catch block
        }
    };

    const handleEdit = (postId) => {
        const postToEdit = posts.find(p => p._id === postId);
        if (!postToEdit.canEdit) {
            alert("User not authorized to update this post, or post not found.");
            return;
        }
        setEditingPost(postToEdit);
    };

    const handleSave = async (postId, newText, newFile, isPictureRemoved) => {
        let updatedImageUrl;
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
            const response = await fetch(`http://localhost:8080/api/users/${userId}/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update post');
            }

            const updatedPost = await response.json();

            // Update local state to reflect the change
            setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, ...updatedPost } : post));
            setEditingPost(null); // Reset the editing state
        } catch (error) {
            console.error('Error updating post:', error);
            alert(error.message); // Show error alert with the message
        }
    };

    const handleUserClick = async (clickedUserId, clickedUserDisplay, clickedUserProfile) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${clickedUserId}/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message === "You are not friends with this user.") {
                    setClickedUserInfo({ userId: clickedUserId, displayname: clickedUserDisplay, profilepic: clickedUserProfile });
                    setNonFriendProfile(true)
                    alert(errorData.message);
                    return;
                } else {
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
            }

            const data = await response.json();
            setPosts(data.posts); // Update the posts state with the fetched posts
            alert(data.message)
            setIsFiltered(true); // Indicate that the posts are now filtered
        } catch (error) {
            console.error('Fetching user posts failed:', error);
            alert(error.message); // Show an alert with the error message
        }
    };

    const resetFilter = async () => {
        setNonFriendProfile(false);
        await fetchPosts();
        setIsFiltered(false); // Reset the filtered state
    };

    return (
        <div className="timeline-container col-12 col-md-5">
            <div className="d-flex flex-column justify-content-center w-100 mx-auto" style={{ paddingTop: '50px', maxWidth: '680px' }}>
                <Stories theme={theme} />
                {!isFiltered && (<CreatePostComponent theme={theme} OnCreatePost={handleAddNewPost} />)}
                {isFiltered && (
                    <>
                        <hr className="m-0 mt-1" />
                        <button onClick={resetFilter} className='rounded btn btn-secondary mt-1'>Back To All Posts</button>
                    </>

                )}
                {posts.map((post) => (
                    <PostHeader
                        theme={theme}
                        author={post.createdBy.displayname}
                        profilepic={post.createdBy.profilepic}
                        key={post._id}
                        postId={post._id}
                        timestamp={post.createdAt}
                        text={post.text}
                        imageUrl={post.imageUrl}
                        likeCount={post.likeCount}
                        userLiked={post.userLiked}
                        onEdit={() => handleEdit(post._id)}
                        onDelete={() => handleDeletePost(post._id)}
                        onUserClick={() => handleUserClick(post.createdBy._id,
                            post.createdBy.displayname,
                            post.createdBy.profilepic)}
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
                {showNonFriendProfile && (
                    <NonFriendProfile
                        theme={theme}
                        show={showNonFriendProfile}
                        onHide={() => setNonFriendProfile(false)}
                        userId={clickedUserInfo.userId}
                        author={clickedUserInfo.displayname}
                        profilepic={clickedUserInfo.profilepic}
                    />
                )}
            </div>
        </div>
    );
};

export default TimeLine;
