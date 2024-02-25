import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm Component', () => {
    let user;

    beforeEach(() => {
        // Mock alert for this test file
        window.alert = jest.fn();
        user = userEvent.setup();
    });
    test('modal opens when "Create New Account" button is clicked', async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /create new account/i }));
        });
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeVisible();
    });

    test('displays error for empty username field upon form submission', async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /create new account/i }));
        });
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /sign up/i }));
        });
        expect(screen.getByText(/username is required/i)).toBeVisible();
    });

    test('closes modal when "Close" button is clicked', async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /create new account/i }));
        });
        await act(async () => {
            await user.click(screen.getByText('Close', { selector: 'button' }));
        });
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    test('updates profile picture preview on file upload', async () => {
        render(<RegistrationForm />);
        await act(async () => {
            // Opening the modal before trying to interact with elements inside it
            await user.click(screen.getByRole('button', { name: /create new account/i }));
        });
        // Finding the file input and simulating a file upload
        const fileInput = document.body.querySelector('input[type="file"]');
        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

        //Act to wrap asynchronous operations
        await act(async () => {
            await user.upload(fileInput, file);
        });

        await waitFor(() => {
            const img = screen.getByAltText('Profile');
            expect(img).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
        });
    });

});
