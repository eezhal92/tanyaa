import Prompt, { PromptPayload } from '../components/Prompt'
import { useCallback, useMemo, useReducer, useState } from 'react'
import Announcement from '../Announcement'
import Header from '../containers/Header'
import QuestionItem from '../components/QuestionItem'
import { useAppDispatch, useAppSelector } from '../store'
import { qnaSelectors, qnaSlice } from '../store/qna.slice'



// example: https://pigeonhole.at/HELLODIGITAL/q/3138787

type SortKey = 'votes' | 'latest'

function QnAPage() {
  // const [questions, dispatch] = useReducer(questionsReducer, [])
  const questions = useAppSelector(qnaSelectors.selectQuestions);
  const dispatch = useAppDispatch();
  const [votedQuestionIds, setVotedQuestionIds] = useState<string[]>([])

  const [sortBy, setSortBy] = useState<SortKey>('votes');
  const sortedQuestions = useMemo(() => {
    return questions.slice().sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;

      if (b.createdAt > a.createdAt) return -1
      if (b.createdAt < a.createdAt) return 1
      return 0
    })
  }, [questions, sortBy])

  const handleVote = useCallback((id: string, voted: boolean) => {
    if (voted) {
      dispatch(qnaSlice.actions.upvote({ id }))
    } else {
      dispatch(qnaSlice.actions.downvote({ id }))
    }

    if (voted) {
      setVotedQuestionIds(questionIds => questionIds.concat(id))
      return
    }

    setVotedQuestionIds(questionIds => questionIds.filter(questionId => questionId !== id))
  }, []);
  const handleAddQuestion = useCallback((payload: PromptPayload) => {
    dispatch(qnaSlice.actions.addQuestion({
      user: payload.user,
      question: payload.question,
    }))
  }, []);

  return (
    <div>
        <Announcement text="This is announcement example" />
        <Header />
        <Prompt onSubmit={handleAddQuestion}/>
        <div className="s-container">
          <div className="flex justify-between py-2">
            <select className="bg-transparent">
              <option value="">All Questions({questions.length})</option>
            </select>
            <label>
              <select className="bg-transparent" onChange={(e) => setSortBy(e.target.value as SortKey)}>
                <option value="votes">Top voted</option>
                <option value="latest">Latest</option>
              </select>
            </label>
          </div>
          <div
            className="flex"
            style={{ gap: 1, flexDirection: 'column' }}
          >
            {sortedQuestions.map(question => (
              <QuestionItem
                key={question.id}
                question={question}
                isVoted={votedQuestionIds.includes(question.id)}
                onVote={handleVote}
              />
            ))}
          </div>
          <div className="mt-4" />
        </div>
    </div>
  )
}

export default QnAPage
