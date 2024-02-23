# FooBook

Part 2 of the final project in the advnaced systems programming course.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

```bash
- Node.js
- npm
```

### Installing

Step by step series to get a development environment running:

1. Clone the repo or download the ZIP file

```bash
git clone https://github.com/TomerBeren/FooBook_Web
```

Or download and extract the ZIP file from the GitHub repository page.

2. Navigate to the project directory

```bash
cd path/to/your-project
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm start
```

The app should now be running on http://localhost:3000.

## Running the Tests

To run the tests use this command:

```bash
npm test
```
If the test didnt run all tests press a.


## Login

To login use our hardoced credentials:

Username: Tomer
Password: a5k8b123

## Registration

If you register and then try to register with the same username you will get an error
becuase we used local session for this step before implementing a hardcoded user.


### **Feed**

- **Adding a Post:** To add a post, click the "What's on your mind" button. Blank posts are permitted.
- **Editing/Deleting a Post:** To edit or delete a post, click the edit button located in the upper right corner of the post.
- **Commenting on a Post:** To comment on a post, you can either click the upside-down arrow or the comment button.
- **Adding a Comment:** To add a comment, type your text into the input box and press enter.
- **Editing a Comment:** To edit a comment, click the edit button, make your changes, and then click save.
- **Deleting a Comment:** To delete a comment, click the delete button.
- **Liking a Post:** To like a post, simply click the like button.
- **Logging Out:** To logout, click the logout button located on the lower left side of the page.
- **Dark Mode:** To switch to dark mode, press the dark mode button on the lower left side.

### **Feed Security**

- **Direct URL Access:** Attempting to directly access the feed by changing the URL to `/feed` will not work if you are not logged in.
- **Session Persistence:** If you log in and then press the back button on your browser, you will still have access to the feed because you have not logged out.
- **Logout Restriction:** Once you log out, direct access to the feed page will be restricted again, securing the feed page from unauthorized access.
