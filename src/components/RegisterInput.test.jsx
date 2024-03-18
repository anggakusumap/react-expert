import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByLabelText('Name');

    // Action
    await userEvent.type(nameInput, 'John Doe');

    // Assert
    expect(nameInput.value).toBe('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    // Action
    await userEvent.type(emailInput, 'test@example.com');

    // Assert
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByLabelText('Password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = screen.getByLabelText('Name');
    await userEvent.type(nameInput, 'John Doe');

    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'test@example.com');

    const passwordInput = screen.getByLabelText('Password');
    await userEvent.type(passwordInput, 'password123');

    const registerButton = screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
