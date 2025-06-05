import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Big Transit Example Front-End')).toBeInTheDocument();
  });
}); 