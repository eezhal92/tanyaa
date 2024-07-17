import Prompt, { PromptPayload } from '../components/Prompt'
import { useCallback, useMemo, useReducer, useState } from 'react'
import { Question, User } from '../types'
import Announcement from '../Announcement'
import Header from '../containers/Header'
import QuestionItem from '../components/QuestionItem'


type UpvoteAction = {
  type: 'UPVOTE',
  id: string
}

type DownvoteAction = {
  type: 'DOWNVOTE',
  id: string
}

type AddQuestionAction = {
  type: 'ADD_QUESTION',
  user: User | null,
  question: string,
}

type QuestionActions = UpvoteAction | DownvoteAction | AddQuestionAction

let nextId = 4;
function questionsReducer(state: Question[], action: QuestionActions) {
  switch(action.type) {
    case 'UPVOTE': {
      return state.map(el => {
        if (el.id !== action.id) return el;

        return { ...el, votes: el.votes + 1 }
      })
    }
    case 'DOWNVOTE': {
      return state.map(el => {
        if (el.id !== action.id) return el;

        return { ...el, votes: el.votes - 1 }
      })
    }
    case 'ADD_QUESTION': {
      const newQuestion: Question = {
        id: String(++nextId),
        user: action.user,
        createdAt: new Date().toISOString(),
        content: action.question,
        votes: 0,
      }
      return state.concat(newQuestion)
    }
  }
}

// example: https://pigeonhole.at/HELLODIGITAL/q/3138787

type SortKey = 'votes' | 'latest'

function QnAPage() {
  const [questions, dispatch] = useReducer(questionsReducer, [])
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
    dispatch({
      type: voted ? 'UPVOTE' : 'DOWNVOTE',
      id,
    });
    if (voted) {
      setVotedQuestionIds(questionIds => questionIds.concat(id))
      return
    }

    setVotedQuestionIds(questionIds => questionIds.filter(questionId => questionId !== id))
  }, []);
  const handleAddQuestion = useCallback((payload: PromptPayload) => {
    dispatch({
      type: 'ADD_QUESTION',
      user: payload.user,
      question: payload.question,
    })
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
