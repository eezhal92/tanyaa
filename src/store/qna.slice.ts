import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Question, User } from "../types"
import { RootState } from "."

const initialState: { questions: Question[] } = {
  questions: []
}

type UpvoteAction = {
  id: string
}

type DownvoteAction = {
  id: string
}

type AddQuestionAction = {
  user: User | null,
  question: string,
}

let nextId = 4;

export const qnaSelectors = {
  selectQuestions: (state: RootState) => state.qna.questions,
}


export const qnaSlice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    upvote(state, action: PayloadAction<UpvoteAction>) {
      state.questions = state.questions.map(el => {
        if (el.id !== action.payload.id) return el;

        return { ...el, votes: el.votes + 1 }
      })
    },
    downvote(state, action: PayloadAction<DownvoteAction>) {
      state.questions = state.questions.map(el => {
        if (el.id !== action.payload.id) return el;

        return { ...el, votes: el.votes - 1 }
      })
    },
    addQuestion(state, action: PayloadAction<AddQuestionAction>) {
      const newQuestion: Question = {
        id: String(++nextId),
        user: action.payload.user,
        createdAt: new Date().toISOString(),
        content: action.payload.question,
        votes: 0,
      }
      state.questions = state.questions.concat(newQuestion)
    }
  }
})
