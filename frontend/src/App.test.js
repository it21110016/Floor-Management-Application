import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Floor Management heading', () => {
  render(<App />);
  
  const headingElement = screen.getByText(/Floor Management/i);
  expect(headingElement).toBeInTheDocument();
});
