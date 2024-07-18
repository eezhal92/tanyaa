import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from "react"
import { User } from "../types";

const maxChar = 192;

function isQuestionLengthValid(question: string) {
  return maxChar - question.length >= 0;
}

export type PromptPayload = { user: User | null, question: string }

type PromptProps = {
  user: User | null,
  onSubmit: (payload: PromptPayload) => void,
}

export default function Prompt({ user, onSubmit }: PromptProps) {
  const [expanded] = useState<boolean>(true);

  const [question, setQuestion] = useState<string>('');
  const charsLeft = useMemo(() => {
    return maxChar - question.length;
  }, [question]);
  const handleQuestionInputChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    const newQuestion = e.target.value
    if (!isQuestionLengthValid(newQuestion)) return;
    setQuestion(newQuestion);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((event) => {
    event.preventDefault();
    if (question.length < 5) {
      alert('Question must be more than 5 characters');
      return;
    }
    onSubmit({ user, question });
    setQuestion('');
  }, [user, question, onSubmit]);

  return (
    <div className="bg-orange-400 py-4">
      <div className="s-container">
        <h2 className="text-lg font-bold text-white mb-5">Digital Marketing: What's next?</h2>

        <form onSubmit={handleSubmit} className="bg-white px-4 py-2 rounded-lg">
          <textarea
            className="w-full focus:outline-none"
            placeholder="Enter your question here as Anonymous..."
            value={question}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
            onChange={handleQuestionInputChange}
          ></textarea>
          <div style={{ display: expanded ? 'block' : 'none' }}>
            <div className="text-right text-gray-400 text-sm mb-2">
              {charsLeft} char left
            </div>
            <div className="flex justify-between">
              <span> </span>
              <button type="submit" className="bg-orange-400 font-bold border border-orange-500 text-white px-7 py-2 rounded">Ask</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
