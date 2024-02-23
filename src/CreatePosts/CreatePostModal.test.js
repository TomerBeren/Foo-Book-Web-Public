import { render, screen, fireEvent } from '@testing-library/react';
import CreatePostModal from './CreatePostModal';

test('create post on form submission', () => {

  const onRequestClose = jest.fn();
  const onCreatePost = jest.fn();
  render(<CreatePostModal isOpen={true} onRequestClose={onRequestClose} onCreatePost={onCreatePost} />);
  
  // Find the textarea by its placeholder text and simulate typing
  const postInput = screen.getByPlaceholderText("How Are You Feeling?");
  fireEvent.change(postInput, { target: { value: 'Test Post' } });
  
  const postButton = screen.getByRole('button', { name: 'Post' });
  fireEvent.click(postButton);
  
  // Check if onCreatePost was called with the expected parameters
  expect(onCreatePost).toHaveBeenCalledWith(expect.objectContaining({
    text: 'Test Post',
    imageUrl: expect.any(String) 
  }));
  
});
