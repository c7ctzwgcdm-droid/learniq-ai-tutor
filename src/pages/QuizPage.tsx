import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, CheckCircle, XCircle, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

type Difficulty = "beginner" | "intermediate" | "advanced";
type QuizState = "setup" | "loading" | "quiz" | "results";

const QUIZ_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-quiz`;

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("setup");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setState("loading");

    try {
      const resp = await fetch(QUIZ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ topic: topic.trim(), difficulty, count: 5 }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const data = await resp.json();
      const qs: Question[] = data.questions.map((q: any, i: number) => ({
        id: i + 1,
        ...q,
      }));
      setQuestions(qs);
      setAnswers(Array(qs.length).fill(null));
      setCurrentQ(0);
      setSubmitted(false);
      setState("quiz");
    } catch (e: any) {
      console.error("Quiz error:", e);
      toast.error(e.message || "Failed to generate quiz");
      setState("setup");
    }
  };

  const selectAnswer = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setState("results");
  };

  const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i]?.correctIndex ? 1 : 0), 0);
  const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;

  if (state === "setup") {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Quiz Generator</h1>
          <p className="text-muted-foreground">Generate a quiz on any topic with AI-powered questions.</p>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label>Topic</Label>
            <Input
              placeholder="e.g. Newton's Laws, Photosynthesis, Contract Law..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <div className="flex gap-2">
              {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors border ${
                    difficulty === d
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={startQuiz} disabled={!topic.trim()} className="w-full gradient-primary text-primary-foreground">
            <Sparkles className="h-4 w-4 mr-2" /> Generate Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="p-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-lg font-heading font-semibold text-foreground">Generating your quiz...</p>
        <p className="text-muted-foreground text-sm mt-1">Creating {difficulty} questions about "{topic}"</p>
      </div>
    );
  }

  if (state === "results") {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full mb-4 ${percentage >= 70 ? "gradient-primary" : "bg-destructive/10"}`}>
            <span className={`text-2xl font-bold ${percentage >= 70 ? "text-primary-foreground" : "text-destructive"}`}>{percentage}%</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-foreground mb-1">
            {percentage >= 90 ? "Outstanding!" : percentage >= 70 ? "Great job!" : percentage >= 50 ? "Keep practising!" : "Time to review!"}
          </h1>
          <p className="text-muted-foreground">{score}/{questions.length} correct answers on "{topic}"</p>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.correctIndex;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border p-4 ${isCorrect ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"}`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />}
                  <span className="text-sm font-medium text-foreground">{q.question}</span>
                </div>
                {!isCorrect && answers[i] !== null && (
                  <p className="text-xs text-destructive ml-7 mb-1">Your answer: {q.options[answers[i]!]}</p>
                )}
                <p className="text-xs text-primary ml-7 mb-2">Correct: {q.options[q.correctIndex]}</p>
                <p className="text-xs text-muted-foreground ml-7">{q.explanation}</p>
              </motion.div>
            );
          })}
        </div>

        <Button className="w-full mt-6 gradient-primary text-primary-foreground" onClick={() => { setState("setup"); setTopic(""); }}>
          Take Another Quiz
        </Button>
      </div>
    );
  }

  const q = questions[currentQ];
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold font-heading text-foreground">Quiz: {topic}</h1>
          <span className="text-sm text-muted-foreground">{currentQ + 1}/{questions.length}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <p className="text-base font-medium text-foreground mb-4">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => selectAnswer(currentQ, oi)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    answers[currentQ] === oi
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border bg-background text-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="font-medium text-muted-foreground mr-2">{String.fromCharCode(65 + oi)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" disabled={currentQ === 0} onClick={() => setCurrentQ(prev => prev - 1)}>
              Previous
            </Button>
            {currentQ < questions.length - 1 ? (
              <Button variant="default" onClick={() => setCurrentQ(prev => prev + 1)} disabled={answers[currentQ] === null}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className="gradient-primary text-primary-foreground" onClick={submitQuiz} disabled={answers.some(a => a === null)}>
                Submit Quiz
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
