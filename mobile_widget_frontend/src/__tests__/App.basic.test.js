import { render, screen } from "@testing-library/react";
import App from "../App";
import { HashRouter } from "react-router-dom";

test("renders header title", () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  expect(screen.getByLabelText(/Application Header/i)).toBeInTheDocument();
});

test("renders sticky actions on home route", () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Later/i })).toBeInTheDocument();
});
