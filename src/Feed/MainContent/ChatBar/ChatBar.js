import React, { useState, useEffect } from 'react';
import SponsoredSection from './SponsoredSection';
import ContactsHeader from './ContactsHeader';
import ContactItem from './ContactItem';
import FriendListModal from './FriendListModal';

const Chatbar = ({ theme }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [friendFriendList, setFriendFriendList] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [showingFriends, setShowingFriends] = useState(false);
  const [selectedFriendInfo, setSelectedFriendInfo] = useState({});
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    // Fetch friend requests
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/friend-requests`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch friend requests');
        }

        const data = await response.json();
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchFriendRequests();
  }, [updateTrigger]);

  useEffect(() => {
    const fetchFriendsList = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/friends`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch friends list');
        }

        const data = await response.json();
        setFriendsList(data.friendList);
      } catch (error) {
        console.error('Error fetching friends list:', error);
      }
    };

    fetchFriendsList();
  }, [updateTrigger]);

  const acceptFriendRequest = async (friendRequestId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/friends/${friendRequestId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to accept friend request');
      } else {
        alert(data.message || 'Friend request accepted successfully');
        setUpdateTrigger(!updateTrigger);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('An error occurred while trying to accept the friend request.');
    }
  };

  const deleteFriend = async (friendId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/friends/${friendId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to delete friend');
      } else {
        alert(data.message || 'Friend deleted successfully');
        // Trigger a refresh of the friends list and friend requests list
        setUpdateTrigger(!updateTrigger);
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
      alert('An error occurred while trying to delete the friend.');
    }
  };

  const showFriends = async (friendId, friendDisplayName, friendProfilePic) => {
    setShowingFriends(true);
    setSelectedFriendInfo({ displayname: friendDisplayName, profilepic: friendProfilePic }); // Save selected friend info
    try {
      const response = await fetch(`http://localhost:8080/api/users/${friendId}/friends`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch friends list');
      } else {
        setFriendFriendList(data.friendList);
      }
    } catch (error) {
      console.error('Error fetching friends list:', error);
      alert(error.message);
    }
  }

  return (
    <div className="chatbar-container col-md-3">
      <div className={`h-100 overflow-visible scrollbar ${theme === 'dark' ? 'text-white bg-black' : ''}`}
        style={{ maxWidth: "360px", width: "100%", zIndex: 4, paddingTop: "50px", position: 'absolute', right: 0 }}>
        <div className="p-3 mt-4">
          <SponsoredSection theme={theme} />
          <hr className="m-0" />
          <ContactsHeader title="Friend requests" />
          {friendRequests.map((friendRequest, index) => (
            <ContactItem
              key={index}
              imageUrl={friendRequest.profilepic}
              name={friendRequest.displayname}
              onRight={() => acceptFriendRequest(friendRequest._id)}
              onLeft={() => deleteFriend(friendRequest._id)}
              leftButtonLabel="Decline"
              rightButtonLabel="Accept" />
          ))}
          <hr className="m-0" />
          <ContactsHeader title="Friend List" />
          {friendsList.map((friendList, index) => (
            <ContactItem
              key={index}
              imageUrl={friendList.profilepic}
              name={friendList.displayname}
              onRight={() => deleteFriend(friendList._id)}
              onLeft={() => showFriends(friendList._id, friendList.displayname, friendList.profilepic)}
              leftButtonLabel="Friends"
              rightButtonLabel="Delete" />
          ))}
          {showingFriends && (
            <FriendListModal
              theme={theme}
              author={selectedFriendInfo.displayname}
              profilepic={selectedFriendInfo.profilepic}
              friendsList={friendFriendList}
              show={Boolean(showingFriends)}
              onHide={() => setShowingFriends(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbar;
