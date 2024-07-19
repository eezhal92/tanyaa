import { Question } from "../types";

type QuestionItemProps = {
  question: Question;
  isVoted: boolean;
  onVote: (id: string, voted: boolean) => void;
};

function VoteIcon({ isVoted }: { isVoted: boolean }) {
  let style: { clipPath: string } = { clipPath: 'inset(32px 0 0 0)' }
  if (isVoted) {
    style = { clipPath: 'inset(0)' }
  }
  return (
   <svg
     viewBox="0 0 32 32"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     overflow="visible"
   >
     <g className="unfilled circle">
       <path
         d="M16 1.06667C19.9893 1.06667 23.7387 2.62 26.56 5.44C29.38 8.26 30.9333 12.0107 30.9333 16C30.9333 19.9893 29.38 23.7387 26.56 26.56C23.74 29.38 19.9893 30.9333 16 30.9333C12.0107 30.9333 8.26133 29.38 5.44 26.56C2.62 23.74 1.06667 19.9893 1.06667 16C1.06667 12.0107 2.62 8.26133 5.44133 5.44C8.26133 2.62 12.0107 1.06667 16 1.06667ZM16 0C7.164 0 0 7.164 0 16C0 24.836 7.164 32 16 32C24.836 32 32 24.836 32 16C32 7.164 24.8373 0 16 0Z"
         fill="#E8E8EA"
       ></path>
     </g>
     <g className="unfilled arrow">
       <path
         d="M24.2155 21.8347H7.73625C6.97606 21.8347 6.31571 21.448 6.0135 20.8254C5.75123 20.2867 5.82046 19.676 6.19856 19.1947L14.4382 8.68135C14.7937 8.22802 15.3542 7.96802 15.9746 7.96802C16.595 7.96802 17.1568 8.22802 17.5109 8.68135L25.7506 19.1947C26.1287 19.6774 26.1979 20.2867 25.9356 20.8254C25.6334 21.448 24.9731 21.8347 24.2129 21.8347H24.2155ZM7.0373 19.8534C6.87887 20.056 6.91482 20.24 6.97206 20.3587C7.06393 20.5467 7.31821 20.768 7.73625 20.768H24.2155C24.6336 20.768 24.8879 20.548 24.9797 20.3587C25.037 20.24 25.0729 20.0547 24.9145 19.8534L16.6748 9.34002C16.5257 9.14935 16.2635 9.03468 15.9759 9.03468C15.6883 9.03468 15.426 9.14802 15.2769 9.34002L7.0373 19.8534Z"
         fill="#C3C3C9"
       ></path>
     </g>
     <g className="filled" style={style}>
       <path
         className="filled-circle-path"
         d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
         fill="#FDF1E9"
       ></path>
       <g className="arrow">
         <path
           className="filled-arrow-path"
           d="M6.61791 19.556L14.8576 9.04269C15.3901 8.36402 16.5617 8.36402 17.0942 9.04269L25.3338 19.556C25.9289 20.316 25.2886 21.3334 24.2155 21.3334H7.73623C6.66318 21.3334 6.0228 20.316 6.61791 19.556Z"
           fill="#F07424"
         ></path>
       </g>
     </g>
   </svg>
  );
}

export default function QuestionItem({
  question,
  isVoted,
  onVote,
}: QuestionItemProps) {
  return (
    <div data-testid="question-item" data-voted={isVoted ? "true" : "false"} className="bg-white p-4 flex" data-created-at={question.createdAt}>
      <div className="" style={{ flexBasis: 60 }}>
        <div className="text-center">
          <button
            aria-label="vote-button"
            className="cursor-pointer inline-block"
            style={{ width: 32, height: 32 }}
            onClick={() => {
              onVote(question.id, !isVoted)
            }}
          >
            <VoteIcon isVoted={isVoted} />
          </button>
          <p data-testid="vote-count" className="font-bold">{question.votes}</p>
        </div>
      </div>
      <div>
        <p className="mb-1 text-gray-400 text-sm">
          {question.user?.name ?? "Anonymous"}
        </p>
        <p data-testid="question-title">{question.content}</p>
      </div>
    </div>
  );
}
