import { User, Award, CreditCard, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const badges = [
  { name: "Critical Thinking", score: 85, date: "Mar 15, 2026" },
  { name: "Science Fundamentals", score: 78, date: "Mar 10, 2026" },
  { name: "Technology Literacy", score: 92, date: "Mar 5, 2026" },
];

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account, view badges, and subscription.</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <User className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold font-heading text-foreground">Alex Johnson</h2>
            <p className="text-sm text-muted-foreground">alex@university.edu</p>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-base font-semibold font-heading text-foreground">Subscription</h2>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">Free Plan</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Upgrade to Pro for unlimited quizzes, assessments, and AI tutor messages.</p>
        <Button variant="hero" className="w-full">
          <Crown className="h-4 w-4 mr-2" /> Upgrade to Pro — $9.99/mo
        </Button>
      </div>

      {/* Badges */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold font-heading text-foreground">Badges Earned</h2>
        </div>
        <div className="space-y-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg border border-primary/10 bg-primary/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary">
                  <Award className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.date}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-primary">{badge.score}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
