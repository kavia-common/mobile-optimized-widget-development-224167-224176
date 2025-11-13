import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders header title", () => {
  render(<App />);
  expect(screen.getByLabelText(/Application Header/i)).toBeInTheDocument();
});

test("renders sticky actions", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Later/i })).toBeInTheDocument();
});
