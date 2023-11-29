import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Counter from './Counter';

describe('Counter', () => {
  it('render count', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(<Counter />);
    const button = getByRole('button')
    expect(button).toHaveTextContent('Count 0')
    await user.click(button)
    expect(button).toHaveTextContent('Count 1')
  });
});
