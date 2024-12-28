import { useState, useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizState = {
  status: "loading" | "error" | "ready";
  error?: string;
};

const React = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quit, setQuit] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({ status: "loading" });
  const [loadingQuit, setLoadingQuit] = useState(false);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await fetch("/quiz-questions/react.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();

        if (!mounted) return;

        const questionData = Array.isArray(data) ? data : data.quiz?.questions;

        if (!Array.isArray(questionData)) {
          throw new Error("Invalid JSON structure");
        }

        setQuestions(questionData);
        setQuizState({ status: "ready" });
      } catch (error) {
        if (!mounted) return;
        setQuizState({
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Failed to load quiz questions",
        });
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, []);

  if (quizState.status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (quizState.status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Failed to Load Quiz
        </h2>
        <p className="text-gray-600">{quizState.error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">No questions available.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      setShowScore(true);
    }
  };

  const handleQuit = () => {
    setConfirmQuit(true);
  };

  const confirmQuitAction = () => {
    // setLoadingQuit(true);
    setQuit(true);
    setQuizFinished(true);
    setLoadingQuit(false);
    setShowScore(true);
    // setTimeout(() => {
    //   setQuit(true);
    //   setQuizFinished(true);
    //   setLoadingQuit(false);
    //   setShowScore(true);
    // }, 1500);
  };

  const cancelQuitAction = () => {
    setConfirmQuit(false);
  };

  const renderScore = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        {quizFinished ? "Quiz Complete! 🎉" : "Quiz Ended"}
      </h2>
      <div className="flex flex-col items-center space-y-2">
        <div className="text-6xl font-bold text-blue-600">
          {score}/{questions.length}
        </div>
        <p className="text-xl text-gray-600">
          ({Math.round((score / questions.length) * 100)}% correct)
        </p>
      </div>
      <div className="pt-4">
        <p className="text-gray-600 text-lg">
          {score === questions.length
            ? "Perfect score! Excellent work! 🌟"
            : score >= questions.length * 0.7
            ? "Great job! Keep it up! 👏"
            : "Keep practicing, you'll get better! 💪"}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mt-10 mb-4">
        <h1 className="text-white font-inconsolata font-bold text-3xl text-center">
          Welcome to your first stage of Frontend development quiz
        </h1>
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {!quizFinished && !quit && !confirmQuit ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option)}
                  className={`w-full p-4 text-left rounded-lg transition-colors
                    ${
                      selectedAnswer === option
                        ? "bg-blue-100 border-blue-500 border-2"
                        : "bg-gray-50 border-gray-200 border hover:bg-gray-100"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleQuit}
                className="py-3 px-6 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Quit
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className={`py-3 px-6 rounded-lg font-medium transition-colors
                  ${
                    selectedAnswer
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Next Question
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 py-8">
            {confirmQuit ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Are you sure you want to quit?
                </h3>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={confirmQuitAction}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Yes, Quit
                  </button>
                  <button
                    onClick={cancelQuitAction}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    No, Continue
                  </button>
                </div>
              </div>
            ) : loadingQuit ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                <p className="text-gray-600 text-lg">
                  Calculating your score...
                </p>
              </div>
            ) : showScore ? (
              renderScore()
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default React;
