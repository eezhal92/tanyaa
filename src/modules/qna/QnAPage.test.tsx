import { renderWithProviders, within } from '../../../tests/util';
import { Question } from '../../types';
import QnAPage from './QnAPage';
import userEvent from "@testing-library/user-event";

function setup(votedQuestionIds: Array<string> = []) {
  const questions: Question[] = [
    {
      id: '1',
      votes: 1,
      content: 'Default qns',
      user: null,
      createdAt: new Date('2024-01-01').toISOString(),
    },
  ]
  return renderWithProviders(<QnAPage  />, {
    preloadedState: { qna: { questions, votedQuestionIds } }
  });
}

describe('QnAPage', () => {
  it('able to add question', async () => {
    const { queryAllByTestId, getByRole }  = setup();

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

  it('able to vote question', async () => {
    const { getByTestId, getByRole }  = setup();

    // default state
    let element = getByTestId('question-item');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('data-voted', "false");
    expect(within(element).getByTestId('vote-count')).toHaveTextContent("1");

    // vote
    const user = userEvent.setup();
    await user.click(getByRole('button', { name: 'vote-button' }));

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('data-voted', "true");
    expect(within(element).getByTestId('vote-count')).toHaveTextContent("2");
  });

  it('able to unvote question', async () => {
    const { getByTestId, getByRole }  = setup(["1"]);

    // default state
    let element = getByTestId('question-item');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('data-voted', "true");
    expect(within(element).getByTestId('vote-count')).toHaveTextContent("1");

    // unvote
    const user = userEvent.setup();
    await user.click(getByRole('button', { name: 'vote-button' }));

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('data-voted', "false");
    expect(within(element).getByTestId('vote-count')).toHaveTextContent("0");
  });
});
