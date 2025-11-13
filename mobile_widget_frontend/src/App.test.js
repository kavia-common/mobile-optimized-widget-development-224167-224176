import { render, screen } from '@testing-library/react';
import App from './App';
import { HashRouter } from 'react-router-dom';

test('renders app shell', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  const header = screen.getByLabelText(/Application Header/i);
  expect(header).toBeInTheDocument();
});
