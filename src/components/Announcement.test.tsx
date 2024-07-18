import { renderWithProviders } from '../../tests/util';
import Announcement from './Announcement';

describe('Announcement', () => {
  it('render text', async () => {
    const { getByRole } = renderWithProviders(<Announcement text="Hey" />, {
      theme: 'light'
    });
    expect(getByRole('alert')).toHaveTextContent('Hey')
  });
});
