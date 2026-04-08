"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { aiChatAnswers } from "@/data/portfolio";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "What projects has he built?",
  "What are his skills?",
  "Why should I hire him?",
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi, I am the AI assistant for Raghuraj. Ask me anything about his projects, skills, or impact.",
    },
  ]);

  const normalizedAnswers = useMemo(() => aiChatAnswers, []);

  const sendMessage = (content: string) => {
    const userMessage = content.trim();
    if (!userMessage) {
      return;
    }

    const normalized = userMessage.toLowerCase().replace(/[^a-z\s]/g, "").trim();

    const answer =
      Object.entries(normalizedAnswers).find(([key]) => normalized.includes(key))?.[1] ??
      "Raghuraj is an AI-focused full-stack builder with hands-on Gen-AI internship experience and production-minded project execution.";

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: answer },
    ]);
    setInput("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/15 px-5 py-3 text-sm text-cyan-100 shadow-[0_0_30px_rgba(56,189,248,0.35)] backdrop-blur"
      >
        <MessageSquare className="h-4 w-4" /> Ask about Raghuraj
      </button>

      {open ? (
        <div className="fixed bottom-24 right-6 z-50 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-white/20 bg-zinc-900/90 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-white">
              <Bot className="h-4 w-4 text-cyan-300" /> Ask about Raghuraj
            </p>
            <button onClick={() => setOpen(false)} className="text-zinc-300 transition hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`rounded-xl px-3 py-2 text-sm ${
                  msg.role === "assistant"
                    ? "bg-white/8 text-zinc-200"
                    : "ml-auto max-w-[85%] bg-cyan-400/20 text-cyan-100"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button key={prompt} onClick={() => sendMessage(prompt)} className="quick-prompt">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="flex-1 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-400 focus:border-cyan-300/60"
                placeholder="Ask a question..."
              />
              <button type="submit" className="rounded-lg bg-cyan-400/25 px-3 text-cyan-100 transition hover:bg-cyan-400/35">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
