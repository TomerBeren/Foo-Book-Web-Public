import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';

beforeEach(() => {
    // Mock alert for this test file
    window.alert = jest.fn();
  });

describe('RegistrationForm Component', () => {
    test('modal opens when "Create New Account" button is clicked', async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);
        await user.click(screen.getByRole('button', { name: /create new account/i }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeVisible();
    });

    test('displays error for empty username field upon form submission', async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);
        await user.click(screen.getByRole('button', { name: /create new account/i }));
        await user.click(screen.getByRole('button', { name: /sign up/i }));
        expect(screen.getByText(/username is required/i)).toBeVisible();
    });

    test('closes modal when "Close" button is clicked', async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);
        await user.click(screen.getByRole('button', { name: /create new account/i }));
        await user.click(screen.getByText('Close', { selector: 'button' }));
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    test('updates profile picture preview on file upload', async () => {
        const user = userEvent.setup();

        render(<RegistrationForm />);
      
        // Make sure the modal is open before trying to interact with elements inside it
        await user.click(screen.getByRole('button', { name: /create new account/i }));

        // Use the container to find the file input with querySelector
        const fileInput = document.body.querySelector('input[type="file"]');

        expect(fileInput).not.toBeNull(); // This line is just to ensure the file input is correctly selected

        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        await user.upload(fileInput, file);

        await waitFor(() => {
            const imgSrc = screen.getByAltText('Profile').src;
            expect(imgSrc.startsWith('data:image/png;base64,')).toBe(true);
        });
       
    });
});
