import Prompt, { PromptPayload } from '../../components/Prompt'
import { useCallback, useState } from 'react'
import Announcement from '../../components/Announcement'
import Header from '../../containers/Header'
import { useAppDispatch, useAppSelector } from '../../store'
import { qnaSelectors, qnaSlice } from '../../store/qna.slice'
import { authSelectors } from '../../store/auth.slice'
import QuestionList from './QuestionList'

// example: https://pigeonhole.at/HELLODIGITAL/q/3138787

function QnAPage() {
  const user = useAppSelector(authSelectors.selectUser);
  const questions = useAppSelector(qnaSelectors.selectQuestions);
  const votedQuestionIds = useAppSelector(qnaSelectors.selectVotedQuestionIds);
  const dispatch = useAppDispatch();

  const handleVote = useCallback((id: string, voted: boolean) => {
    if (voted) {
      dispatch(qnaSlice.actions.upvote({ id }))
    } else {
      dispatch(qnaSlice.actions.downvote({ id }))
    }
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
        <Prompt user={user} onSubmit={handleAddQuestion}/>
        <QuestionList
          votedIds={votedQuestionIds}
          questions={questions}
          onVote={handleVote}
        />
    </div>
  )
}

export default QnAPage
