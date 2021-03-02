import { render, screen } from 'test/test-utils';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('should render', () => {
    render(<Dashboard />);
    // screen.debug();
  });
});
