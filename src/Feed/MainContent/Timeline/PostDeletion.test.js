import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeLine from './TimeLine'; 

describe('Post Deletion via Options Menu', () => {
  test('successfully deletes the first post after opening its options menu and clicking delete', async () => {
    // Render the TimeLine component
    const { getAllByLabelText, queryByText } = render(<TimeLine />);

    // Use getAllByLabelText to get all options buttons and select the first one
    const optionsButtons = getAllByLabelText('Options');
    const firstPostOptionsButton = optionsButtons[0];

    // Click the options button to open the menu for the first post
    fireEvent.click(firstPostOptionsButton);

    // Wait for the options menu of the first post to become visible, then click "Delete Post"
    await waitFor(() => {
      const deletePostOption = queryByText('Delete Post');
      if (deletePostOption) {
        fireEvent.click(deletePostOption);
      }
    });

    // Verify the first post has been deleted by checking the absence of its unique content
    expect(queryByText("Here's my first post!")).not.toBeInTheDocument();
  });
});
