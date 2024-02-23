import { render, screen, fireEvent } from '@testing-library/react';
import CreatePostComponent from './CreatePostComponent';

test('modal opens on input click', () => {
  render(<CreatePostComponent OnCreatePost={() => {}} theme="light" />);
  
  // Simulate user clicking on the input field
  const inputField = screen.getByPlaceholderText("What's on your mind, Tomer?");
  fireEvent.click(inputField);
  
  // Check if the modal is present in the document
  expect(screen.getByText("Create Post")).toBeInTheDocument;
});
