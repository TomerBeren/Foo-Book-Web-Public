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


## Feed

- **Adding a Post:** To add a post, click the "What's on your mind" button. Blank posts are permitted.
- **Editing/Deleting a Post:** To edit or delete a post, click the edit button located in the upper right corner of the post.
- **Editing functionalities:** Change the text if wanted, change the photo if wanted or remove the current photo of the post. If no photo exists their will be no button to remove it.
- **Commenting on a Post:** To comment on a post, you can either click the upside-down arrow or the comment button.
- **Adding a Comment:** To add a comment, type your text into the input box and press enter.
- **Editing a Comment:** To edit a comment, click the edit button, make your changes, and then click save.
- **Deleting a Comment:** To delete a comment, click the delete button.
- **Liking a Post:** To like a post, simply click the like button.
- **Logging Out:** To logout, click the logout button located on the lower left side of the page.
- **Dark Mode:** To switch to dark mode, press the dark mode button on the lower left side.

## Feed Security

- **Direct URL Access:** Attempting to directly access the feed by changing the URL to `/feed` will not work if you are not logged in.
- **Session Persistence:** If you log in and then press the back button on your browser, you will still have access to the feed because you have not logged out.
- **Logout Restriction:** Once you log out, direct access to the feed page will be restricted again, securing the feed page from unauthorized access.

## Development Approach

### Initial Design with HTML

For our project, we initially wanted to layout everything using simple HTML. This step was crucial for us to visualize the overall design and structure of our application. It allowed us to see how each page would look and how users would interact with the basic elements.

### Transitioning to React

Once we had the HTML pages looking the way we wanted, we knew it was time to transition into React. So, we started sorting the repeated HTML code into React components. This approach wasn't just about adopting a new technology; it was about making our code cleaner, more modular, and easier to maintain. By identifying common patterns and repetitive elements in our HTML designs, we could create reusable components, significantly reducing redundancy and improving our workflow.

#### Component Creation

This process involved breaking down the entire application into smaller, manageable pieces. Each component was then developed to handle a specific piece of the application's functionality. For example, we created components for the navigation bar, posts, comments, and the login and registration forms.

#### Logic Integration

After sorting our HTML into React components, we began integrating the logic into each component. This step was about making sure that each part of the application didn't just look right but also worked right. We added state management to handle user interactions, implemented routing to navigate between different parts of the application and many more.


### Summary

In summary, we started with simple HTML to get a clear idea of our application's look and feel. Then, by transitioning to React, we organized our code into components, making our project more scalable and maintainable. This approach also allowed us to implement complex functionalities more efficiently, turning our initial designs into a fully functional web application.



