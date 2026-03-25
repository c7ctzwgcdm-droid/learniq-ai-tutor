import { motion } from "framer-motion";
import { Brain, Zap, Target, BookOpen, Award, ArrowRight, Check, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: Brain,
    title: "AI Tutor Chat",
    description: "Ask anything academic. Get structured explanations, examples, study tips, and follow-up challenges.",
  },
  {
    icon: Zap,
    title: "Quiz Generator",
    description: "Generate quizzes on any topic with adjustable difficulty. Get instant feedback with detailed explanations.",
  },
  {
    icon: Target,
    title: "Skill Assessment",
    description: "Take adaptive assessments across key academic skills. Earn badges and track your growth.",
  },
  {
    icon: BookOpen,
    title: "Exam Tips Engine",
    description: "Get personalised revision plans, memory techniques, and last-minute tips for any exam type.",
  },
  {
    icon: Award,
    title: "Progress Dashboard",
    description: "Visual analytics showing quiz scores, study streaks, badges earned, and AI-identified weak areas.",
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description: "AI analyses your performance to highlight strengths and pinpoint exactly where to improve.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "20 AI tutor messages/day",
      "3 quizzes/day",
      "1 assessment/month",
      "2 exam tip sessions/day",
      "Progress dashboard",
      "Basic badge system",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    features: [
      "Unlimited AI tutor messages",
      "Unlimited quizzes",
      "Unlimited assessments",
      "Unlimited exam tips",
      "PDF certificates",
      "Priority AI responses",
      "Advanced analytics",
      "Shareable result cards",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-heading text-foreground">LearnIQ</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/register">Sign up free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Academic Excellence
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-primary-foreground leading-tight mb-6">
              Your AI study partner —{" "}
              <span className="text-gradient-primary">learn anything</span>,{" "}
              ace everything.
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
              LearnIQ combines an expert AI tutor, adaptive quizzes, skill assessments, and personalised exam prep into one powerful study companion.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild className="text-base px-8">
                <Link to="/register">
                  Start Learning Free <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="#features">See Features</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeUp} custom={4} className="flex items-center justify-center gap-6 mt-10 text-sm text-primary-foreground/50">
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-primary" /> Free forever tier</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-primary" /> No credit card needed</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-primary" /> All subjects covered</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Everything you need to <span className="text-gradient-primary">ace your studies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Six powerful AI-driven tools designed for university students across every subject.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group relative rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-lg">Start free. Upgrade when you're ready.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-primary bg-card shadow-lg shadow-primary/10"
                    : "border-border bg-card"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold font-heading text-foreground">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-heading text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "hero" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/register">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
              Ready to transform how you study?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of students using AI to study smarter, not harder.
            </p>
            <Button variant="hero" size="lg" asChild className="text-base px-8">
              <Link to="/register">
                Get Started Free <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-primary">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold font-heading text-foreground">LearnIQ</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 LearnIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
