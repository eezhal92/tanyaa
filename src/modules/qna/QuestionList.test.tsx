import { render } from '../../../tests/util';
import { Question } from '../../types';
import QuestionList from './QuestionList';
import userEvent from "@testing-library/user-event";

describe('QuestionList', () => {
  it('render in correct order', async () => {
    const questions: Question[] = [
      {
        id: '1',
        votes: 1,
        content: 'First qns',
        user: null,
        createdAt: new Date('2024-01-01').toISOString(),
      },
      {
        id: '2',
        votes: 0,
        content: 'Second qns',
        user: null,
        createdAt: new Date('2024-01-02').toISOString(),
      }
    ]
    const { queryAllByTestId, getByRole } = render(<QuestionList
      votedIds={[]}
      onVote={() => {}}
      questions={questions}
    />);

    // default order is by votes
    let element = queryAllByTestId('question-item');
    expect(element.length).toBe(2);
    expect(element.at(0)).toHaveTextContent('First qns');
    expect(element.at(1)).toHaveTextContent('Second qns');

    // change order by latest
    const user = userEvent.setup()
    await user.selectOptions(getByRole("combobox", { name: 'sort' }), "latest");

    element = queryAllByTestId('question-item');
    expect(element.length).toBe(2);
    expect(element.at(0)).toHaveTextContent('Second qns');
    expect(element.at(1)).toHaveTextContent('First qns');
  });
});
