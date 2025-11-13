import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app shell', () => {
  render(<App />);
  const header = screen.getByLabelText(/Application Header/i);
  expect(header).toBeInTheDocument();
});
