import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookOpen, Sparkles, Calendar, Brain, AlertTriangle, Zap } from "lucide-react";
import { motion } from "framer-motion";

type ExamType = "final" | "multiple-choice" | "essay" | "oral";

const examTypes: { value: ExamType; label: string }[] = [
  { value: "final", label: "Final Exam" },
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "essay", label: "Essay-Based" },
  { value: "oral", label: "Oral / Viva" },
];

const mockTips = {
  revisionPlan: [
    { day: "Day 1-2", task: "Review core concepts and create a mind map of key topics" },
    { day: "Day 3-4", task: "Practice problems and past papers under timed conditions" },
    { day: "Day 5", task: "Focus on weak areas identified from practice sessions" },
    { day: "Day 6", task: "Create summary flashcards and teach concepts to a study partner" },
    { day: "Day 7", task: "Light review of flashcards, rest well, prepare materials" },
  ],
  memoryTechniques: [
    "Use the method of loci — place key concepts in rooms of a familiar building",
    "Create acronyms for lists (e.g. PEMDAS for order of operations)",
    "Draw diagrams and flowcharts — visual memory is powerful for this subject",
  ],
  commonMistakes: [
    "Not reading the full question before answering",
    "Spending too long on one section — allocate time per question",
    "Forgetting to show working in problem-solving questions",
  ],
  highYieldTips: [
    "Review the marking criteria — understand what examiners look for",
    "Start with questions you're most confident about to build momentum",
    "Leave 5 minutes at the end to review your answers for silly mistakes",
  ],
};

export default function TipsPage() {
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState<ExamType>("final");
  const [showTips, setShowTips] = useState(false);
  const tipsUsed = 1;
  const tipsLimit = 2;

  const generate = () => {
    if (!subject.trim()) return;
    setShowTips(true);
  };

  if (!showTips) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Exam Tips Engine</h1>
          <p className="text-muted-foreground">Get a personalised revision plan and exam strategies powered by AI.</p>
          <div className="text-xs text-muted-foreground mt-2 bg-muted px-3 py-1 rounded-full inline-block">
            {tipsUsed}/{tipsLimit} tip sessions today
          </div>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input placeholder="e.g. Organic Chemistry, Macroeconomics, Constitutional Law..." value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Exam Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {examTypes.map(et => (
                <button
                  key={et.value}
                  onClick={() => setExamType(et.value)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                    examType === et.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {et.label}
                </button>
              ))}
            </div>
          </div>
          <Button variant="hero" onClick={generate} disabled={!subject.trim()} className="w-full">
            <Sparkles className="h-4 w-4 mr-2" /> Generate Exam Tips
          </Button>
        </div>
      </div>
    );
  }

  const sections = [
    { icon: Calendar, title: "7-Day Revision Plan", items: mockTips.revisionPlan.map(r => `**${r.day}:** ${r.task}`) },
    { icon: Brain, title: "Memory Techniques", items: mockTips.memoryTechniques },
    { icon: AlertTriangle, title: "Common Mistakes to Avoid", items: mockTips.commonMistakes },
    { icon: Zap, title: "Last-Minute High-Yield Tips", items: mockTips.highYieldTips },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Exam Tips: {subject}</h1>
          <p className="text-sm text-muted-foreground capitalize">{examType.replace("-", " ")} preparation</p>
        </div>
        <Button variant="outline" onClick={() => { setShowTips(false); setSubject(""); }}>New Session</Button>
      </div>

      <div className="space-y-6">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <section.icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-base font-semibold font-heading text-foreground">{section.title}</h2>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, ii) => (
                <li key={ii} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span className="whitespace-pre-wrap">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
