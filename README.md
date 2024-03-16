# FooBook_Web

FooBook_Web is the React-based frontend for the Foobook social media platform, designed to interact seamlessly with the Foobook_Server's API endpoints. This client-side application provides users with an intuitive interface to engage with the platform's core features, including post creation, friend management, and user profile customization.

## Features

- **Post Viewing**: Users can see the first 20 posts of their friends sorted by the most recent first, followed by the first 5 posts from non-friends, sorted in the same manner.
- **User Posts**: The user is considered their own friend, so their posts will appear within the first 20 posts.
- **Post Interaction**: Users can only edit or delete their own posts. Attempting to modify posts not authored by them is not permitted.
- **Liking Posts**: 
  - When a user likes a post, the like button changes to "Unlike" and the like icon turns blue, indicating that the user has liked the post. Pressing "Unlike" will revert the icon to its default state and change the button back to "Like."
- **Profile Interaction**:
  - Clicking on a user's profile picture or name on a post filters the posts to show only theirs. A "Back to All Posts" button allows returning to the full post view.
  - If the viewed profile is not a friend, a profile modal with an "Add Friend" button will appear instead.
  - If a friend request has already been sent to a user, an alert will notify that a new request cannot be sent.
  - If a user attempts to send a friend request to someone who has already sent them a request, the application will display an alert. This alert informs the user that a friend request has already been sent, advising them to check their pending requests. suggesting the user can simply accept the pending request instead of sending a new one.
- **Friend Management**:
  - The friend request list is visible on the right side of the post list, where incoming requests can be accepted or declined.
  - Accepting a friend request adds the user to your friend list and to the users friend list, while declining removes the request.
  - The friend list allows users to view their friends' friend lists or delete friends. Deleting a friend removes the user from the friend's list as well, ensuring mutual friendship management.
- **User Profile Editing**:
  - Clicking the "vv" button at the top right opens a menu for editing the user's display name or profile picture and provides an option to delete the user account, which also deletes all associated posts.

## Getting Started

To fully experience FooBook_Web's functionalities, ensure that the `Foobook_Server` is running, as this frontend application relies on its API endpoints for data.

### Prerequisites

- A running instance of Foobook_Server
- Node.js
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/TomerBeren/FooBook_Web
cd FooBook_Web
npm install
```

The FooBook_Server comes pre-packaged with the latest build of the FooBook_Web application, making it unnecessary to run the React development client to access the web interface.

If for any reason you wish to run the FooBook_Web seperately you can use the following command:

```bash
npm start
```

## Note

FooBook_Web is the frontend part of the Foobook social media platform. To utilize all features, such as posting, friend requests, and profile management, the backend server (Foobook_Server) must be operational.

For more details on setting up and running the backend, refer to the FooBook_Server README at https://github.com/TomerBeren/FooBook_Server.
