import { useState, useMemo } from "react";
import QuestionItem from "../../components/QuestionItem";
import { Question } from "../../types";

type SortKey = "votes" | "latest";

export default function QuestionList({
  votedIds,
  questions,
  onVote,
}: {
  votedIds: string[];
  questions: Question[];
  onVote: (id: string, voted: boolean) => void;
}) {
  const [sortBy, setSortBy] = useState<SortKey>("votes");
  const sortedQuestions = useMemo(() => {
    return questions.slice().sort((a, b) => {
      if (sortBy === "votes") return b.votes - a.votes;

      if (b.createdAt < a.createdAt) return -1;
      if (b.createdAt > a.createdAt) return 1;
      return 0;
    });
  }, [questions, sortBy]);

  return (
    <div className="s-container">
      <div className="flex justify-between py-2">
        <select className="bg-transparent">
          <option value="">All Questions({questions.length})</option>
        </select>
        <label>
          <select
            aria-label="sort"
            name="sort"
            className="bg-transparent"
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            <option value="votes">Top voted</option>
            <option value="latest">Latest</option>
          </select>
        </label>
      </div>
      <div className="flex" style={{ gap: 1, flexDirection: "column" }}>
        {sortedQuestions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            isVoted={votedIds.includes(question.id)}
            onVote={onVote}
          />
        ))}
      </div>
      <div className="mt-4" />
    </div>
  );
}
