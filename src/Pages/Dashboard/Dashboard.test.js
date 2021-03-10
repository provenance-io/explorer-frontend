import { BLOCK_SPOTLIGHT_URL } from 'consts';
import { render, screen, waitFor } from 'test/test-utils';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('should render', async () => {
    render(<div></div>);
    let loading;

    await waitFor(() => {
      loading = screen.queryByTestId('loading');
    });

    // screen.debug(loading);
    // console.log(server.printHandlers());

    const data = await fetch(`${BLOCK_SPOTLIGHT_URL}`)
      .then((res) => res.json())
      .catch((err) => console.log('err', err));
    console.log('data', data);
  });
});
