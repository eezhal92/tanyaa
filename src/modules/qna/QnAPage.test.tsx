import { renderWithProviders } from '../../../tests/util';
import { Question } from '../../types';
import QnAPage from './QnAPage';
import userEvent from "@testing-library/user-event";

describe('QnAPage', () => {
  it('able to add question', async () => {
    const questions: Question[] = [
      {
        id: '1',
        votes: 1,
        content: 'Default qns',
        user: null,
        createdAt: new Date('2024-01-01').toISOString(),
      },
    ]
    const { queryAllByTestId, getByRole } = renderWithProviders(<QnAPage  />, {
      preloadedState: { qna: { questions } }
    });

    // default order is by votes
    let element = queryAllByTestId('question-item');
    expect(element.length).toBe(1);
    expect(element.at(0)).toHaveTextContent('Default qns');

    const user = userEvent.setup()
    await user.type(getByRole('textbox'), 'New question')
    await user.click(getByRole('button', { name: 'Ask' }))

    element = queryAllByTestId('question-item');
    expect(element.length).toBe(2);
    expect(element.at(0)).toHaveTextContent('Default qns');
    expect(element.at(1)).toHaveTextContent('New question');
  });
});
