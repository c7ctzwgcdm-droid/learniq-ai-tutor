import { Award, Flame, BookOpen, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const scoreData = [
  { date: "Mon", score: 65 },
  { date: "Tue", score: 72 },
  { date: "Wed", score: 68 },
  { date: "Thu", score: 78 },
  { date: "Fri", score: 82 },
  { date: "Sat", score: 75 },
  { date: "Sun", score: 88 },
];

const stats = [
  { label: "Quizzes Taken", value: "24", icon: BookOpen, color: "text-primary" },
  { label: "Average Score", value: "76%", icon: TrendingUp, color: "text-secondary" },
  { label: "Study Streak", value: "7 days", icon: Flame, color: "text-accent" },
  { label: "Badges Earned", value: "3", icon: Award, color: "text-primary" },
];

const badges = [
  { name: "Critical Thinking", score: 85 },
  { name: "Science Fundamentals", score: 78 },
  { name: "Technology Literacy", score: 92 },
];

const weakAreas = [
  "Quantitative Reasoning — scoring below 65% consistently",
  "Academic Writing — needs improvement on citation formatting",
  "Organic Chemistry — struggle with reaction mechanisms",
];

const topicsStudied = [
  "Newton's Laws", "Photosynthesis", "Contract Law", "Linear Algebra",
  "Cell Biology", "Thermodynamics", "Statistics", "Shakespeare", "SQL Basics",
];

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Progress Dashboard</h1>
        <p className="text-muted-foreground">Track your learning journey and identify areas for improvement.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <stat.icon className={`h-5 w-5 mb-2 ${stat.color}`} />
            <p className="text-2xl font-bold font-heading text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Score Chart */}
        <div className="md:col-span-2 rounded-xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold font-heading text-foreground mb-4">Score Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={scoreData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(162, 72%, 40%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(162, 72%, 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 89%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="hsl(162, 72%, 40%)" fill="url(#scoreGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Badges */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold font-heading text-foreground mb-4">Badges Earned</h2>
          <div className="space-y-3">
            {badges.map(badge => (
              <div key={badge.name} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary flex-shrink-0">
                  <Award className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Topics Studied */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold font-heading text-foreground mb-4">Topics Studied</h2>
          <div className="flex flex-wrap gap-2">
            {topicsStudied.map(topic => (
              <span key={topic} className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted text-muted-foreground">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <h2 className="text-base font-semibold font-heading text-foreground">AI-Identified Weak Areas</h2>
          </div>
          <ul className="space-y-2">
            {weakAreas.map((area, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
