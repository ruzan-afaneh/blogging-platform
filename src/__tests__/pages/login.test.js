import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../app/login/page";
import '@testing-library/jest-dom';

jest.mock("../../utils/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(() =>
        Promise.resolve({ data: { user: { id: "test-user-id", email: "test@example.com" } }, error: null })
      ),
    },
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Login Component", () => {
  test("redirects on successful login", async () => {
    render(<Login />);


    // Target the email field
    fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), {
      target: { value: "test@example.com" },
    });

    // Target the password field
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });
  });
});
