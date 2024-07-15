import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import DropdownItem from './DropdownItem';
import ProfileActionItem from './ProfileActionItem';
import EditUserModal from './EditUserModal'; // Ensure you have this component
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authorization/AuthContext';

const UserProfileDropdown = ({ isCaret }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [userId] = useState(localStorage.getItem('userId'))
    const [token] = useState(localStorage.getItem('token'));
    const { userDetails, setUserDetails } = useUser();
    const [showEditModal, setShowEditModal] = useState(false);

    // Function to open the EditUserModal
    const onEdit = () => {
        setShowEditModal(true);
    };

    // Function to close the EditUserModal
    const onHideEditModal = () => {
        setShowEditModal(false);
    };

    // Placeholder function for the delete action
    const onDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: "DELETE", 
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            localStorage.clear(); 
            setUserDetails(null);
            
            alert('User deleted successfully!');
            onHideEditModal(); 
            logout();
            navigate('/login');

        } catch (error) {
            console.error("Failed to delete user:", error);
            alert('Failed to delete user. Please try again.');
        }
    };
    
    const onSave = async (displayName, profilePic) => {
        let updatedImageUrl;
        // Only append the profilePicture if it has been updated
        if (profilePic) {
            updatedImageUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(profilePic);
            });
        }
        const payload = {
            displayname: displayName,
            profilepic: updatedImageUrl,
        };
        console.log(JSON.stringify(payload))
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, { 
                method: "PATCH", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedUser = await response.json();
            console.log(updatedUser.user.displayName)
            console.log(updatedUser.user.profilePic)
            setUserDetails(currentDetails => ({
                ...currentDetails,
                displayName: updatedUser.user.displayName, 
                profilePic: updatedUser.user.profilePic 
            }));
        
            alert('User profile updated successfully!');
            onHideEditModal(); // Close the modal after successful update
        } catch (error) {
            console.error("Failed to update user profile:", error);
            alert('Failed to update user profile. Please try again.');
        }
    };


    if (!isCaret) return null;

    return (
        <>
            <ul className="dropdown-menu border-0 shadow p-3" style={{ width: "23em" }}>
                <DropdownItem
                    imageUrl={userDetails.profilePic}
                    title={userDetails.displayName}
                    subtitle="Welcome back to FooBook"
                />
                <hr />
                <ProfileActionItem
                    iconClass="fas fa-exclamation-circle"
                    title="Edit Profile"
                    subtitle="Do you wish to edit your profile?"
                    onClick={onEdit}
                />
                <hr />
                <ProfileActionItem
                    iconClass="fas fa-trash-alt"
                    title="Delete Profile"
                    subtitle="Do you wish to delete your profile?"
                    onClick={onDelete}
                />
                <hr />
            </ul>
            {/* EditUserModal component */}
            <EditUserModal
                show={showEditModal}
                onHide={onHideEditModal}
                onSave={onSave}
            />
        </>
    );
};

export default UserProfileDropdown;
