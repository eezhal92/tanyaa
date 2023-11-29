import { renderWithProviders, screen } from '../../tests/util';
import userEvent from '@testing-library/user-event'
import OrderList from './OrderList';

describe('OrderList', () => {
  it('add new order', async () => {
    const user = userEvent.setup()
    const { getByText, getByRole, getByLabelText } = renderWithProviders(<OrderList />)

    const input = getByLabelText('order-id-input')
    const button = getByText('Add')

    await user.type(input, 'Awesome')
    await user.click(button)

    expect(getByText(/Awesome/)).toBeInTheDocument()
    expect(getByRole('list').lastChild).toHaveTextContent('#Awesome')
    expect(input).toHaveValue('')
  });

  it('show error', async () => {
    const user = userEvent.setup()
    const { getByText, getByRole, getByLabelText } = renderWithProviders(<OrderList />)

    const input = getByLabelText('order-id-input')
    const button = getByText('Add')

    await user.type(input, 'Ab')
    await user.click(button)
    expect(getByRole('list').lastChild).not.toHaveTextContent('#Ab')
    expect(input).toHaveValue('Ab')

    const alert = await screen.findByRole('alert')
    expect(alert).toBeVisible()
    expect(alert).toHaveTextContent('Minimum 3 characters')
  });
});
