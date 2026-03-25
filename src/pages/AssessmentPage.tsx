import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, Award, ArrowRight, CheckCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface Track {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  completed: boolean;
  score?: number;
  badgeEarned?: boolean;
}

const tracks: Track[] = [
  { id: "critical-thinking", title: "Critical Thinking", description: "Evaluate arguments, identify biases, and draw logical conclusions.", questionCount: 20, completed: true, score: 85, badgeEarned: true },
  { id: "academic-writing", title: "Academic Writing", description: "Structure essays, cite sources, and build compelling arguments.", questionCount: 20, completed: false },
  { id: "quantitative-reasoning", title: "Quantitative Reasoning", description: "Interpret data, solve problems, and apply mathematical concepts.", questionCount: 20, completed: true, score: 62, badgeEarned: false },
  { id: "science-fundamentals", title: "Science Fundamentals", description: "Understand the scientific method, key principles, and lab techniques.", questionCount: 20, completed: false },
  { id: "technology-literacy", title: "Technology Literacy", description: "Navigate digital tools, understand data privacy, and leverage AI.", questionCount: 20, completed: false },
];

export default function AssessmentPage() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const assessmentsUsed = 1;
  const assessmentsLimit = 1;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Skill Assessment</h1>
        <p className="text-muted-foreground">Take adaptive assessments to discover your strengths and earn badges.</p>
        <div className="text-xs text-muted-foreground mt-2 bg-muted px-3 py-1 rounded-full inline-block">
          {assessmentsUsed}/{assessmentsLimit} assessments this month
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tracks.map((track, i) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative rounded-xl border p-5 transition-all ${
              track.completed
                ? track.badgeEarned
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card"
                : "border-border bg-card hover:border-primary/30 hover:shadow-md cursor-pointer"
            }`}
            onClick={() => !track.completed && setSelectedTrack(track.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Target className="h-5 w-5 text-foreground" />
              </div>
              {track.completed && track.badgeEarned && (
                <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  <Award className="h-3 w-3" /> Badge Earned
                </div>
              )}
              {track.completed && !track.badgeEarned && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{track.score}% — needs 70%</span>
              )}
            </div>
            <h3 className="text-base font-semibold font-heading text-foreground mb-1">{track.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{track.description}</p>

            {track.completed ? (
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${track.badgeEarned ? "gradient-primary" : "bg-accent"}`}
                  style={{ width: `${track.score}%` }}
                />
              </div>
            ) : (
              <div className="flex items-center text-sm text-primary font-medium">
                Start Assessment <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
