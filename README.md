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

Describe how to run the automated tests for this system (if applicable):

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

To add a post just press the What's on your mind button. We allowed a blank post.
To edit/delete the post press the edit button on the upper right side of the post.
To comment on a post either press the upside down arrow or press the comment button.
To add a comment enter some text into the input box and press enter.
To edit a comment just press edit then change the text and press save.
To delete a comment press delete.
To like just press like.
If you wish to logout press logout button on the lower left side.
Press the dark mode button on the lower left side to change the theme.

## Feed Security

If you try to change the url to /feed it will not work.
If you login and then press back on the page it will work because you havent loged out.
Only if you log out it wont work again and the feed page will be secured.