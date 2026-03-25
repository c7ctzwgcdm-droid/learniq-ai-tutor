import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedTopics = [
  "Explain Newton's Laws of Motion",
  "What is photosynthesis?",
  "How does contract law work?",
  "Explain the Pythagorean theorem",
];

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesUsed = 3; // mock
  const messagesLimit = 20;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Great question about "${text.trim()}"!\n\n**Explanation:**\nThis is a fascinating topic in academia. Let me break it down for you in a clear, structured way.\n\n**Real-world Example:**\nThink of it like building blocks — each concept builds upon the previous one, creating a solid foundation of understanding.\n\n**Study Tips:**\n1. Create summary flashcards for key terms\n2. Practice explaining the concept to someone else\n3. Connect it to topics you already understand\n\n**Test Yourself:**\nCan you explain this concept in your own words? Try writing a one-paragraph summary without looking at your notes.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between bg-card/30">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold font-heading text-foreground">AI Tutor</h1>
            <p className="text-xs text-muted-foreground">Ask anything academic</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {messagesUsed}/{messagesLimit} messages today
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary mb-4 animate-float">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold font-heading text-foreground mb-2">What would you like to learn?</h2>
            <p className="text-muted-foreground mb-6 max-w-md">Ask any academic question. I'll explain the concept, give examples, and help you study.</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {suggestedTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => sendMessage(topic)}
                  className="text-sm px-4 py-2 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary flex-shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary flex-shrink-0 mt-1">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary flex-shrink-0">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border px-6 py-4 bg-card/30">
        <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex gap-3 max-w-3xl mx-auto">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a question about any subject..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" variant="hero" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
