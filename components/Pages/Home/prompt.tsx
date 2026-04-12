"use client";

import CloseCircle from "@/app/components/icons/closeCircle";
import { Bot, MessageCircle, SendHorizontal, Sparkles } from "lucide-react";
import { useSupabaseBrowser } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const BOT_SENDER_LABEL = "Nzuri AI Bot";

const SUGGESTED_PROMPTS = [
  "What healthcare services do you offer?",
  "How do I register my interest as a client?",
  "Tell me about working with Nzuri as a professional",
] as const;

interface Message {
  role: "user" | "assistant";
  content: string;
  senderLabel?: string;
}

function displayName(user: User | null): string {
  if (!user) return "Guest";
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  if (
    meta?.username &&
    typeof meta.username === "string" &&
    meta.username.trim()
  ) {
    return meta.username.trim();
  }
  if (
    meta?.full_name &&
    typeof meta.full_name === "string" &&
    meta.full_name.trim()
  ) {
    return meta.full_name.trim();
  }
  if (user.email) {
    const local = user.email.split("@")[0]?.trim();
    if (local) return local;
  }
  return "You";
}

function SenderAvatar({
  label,
  variant,
}: {
  label: string;
  variant: "bot" | "user";
}) {
  const initial = (label.trim().charAt(0) || "?").toUpperCase();
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-lg ring-2 ring-white/10 sm:h-10 sm:w-10 sm:text-sm ${
        variant === "bot"
          ? "bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700"
          : "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700"
      }`}
      aria-hidden
    >
      {initial}
    </span>
  );
}

export default function Prompt() {
  const supabase = useSupabaseBrowser();
  const [userDisplayName, setUserDisplayName] = useState<string>("Guest");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let cancelled = false;

    const refreshUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!cancelled) setUserDisplayName(displayName(user));
    };

    void refreshUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled)
        setUserDisplayName(displayName(session?.user ?? null));
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderAtSend = userDisplayName.trim() || "Guest";

    const userMessage: Message = {
      role: "user",
      content: inputText,
      senderLabel: senderAtSend,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", content: "..." },
    ]);

    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.content || "No response from model.",
      };

      setMessages((prev) => [...prev.slice(0, -1), assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "An error occurred. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = useCallback((text: string) => {
    setInputText(text);
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-40 flex flex-col items-stretch gap-3 p-3 sm:items-end sm:p-4">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Nzuri Healthcare AI chat"
          className="animate-smart-animate flex w-full max-h-[min(88dvh,52rem)] flex-col overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.65),0_0_40px_-10px_rgba(16,185,129,0.35)] sm:max-h-[min(85dvh,48rem)] sm:w-[min(100%,24rem)] md:w-[min(100%,28rem)] lg:w-[min(100%,34rem)] xl:w-[min(100%,38rem)] 2xl:w-[42rem]"
        >
          {/* Header */}
          <div className="relative shrink-0 overflow-hidden border-b border-white/5 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_50%_-40%,rgba(52,211,153,0.22),transparent)]"
              aria-hidden
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/90 to-teal-700 text-white shadow-lg shadow-emerald-900/40 ring-1 ring-white/20">
                  <Bot className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h2 className="font-title text-lg font-bold tracking-tight text-white sm:text-xl">
                    <span className="bg-gradient-to-r from-emerald-200 via-teal-100 to-white bg-clip-text text-transparent">
                      Nzuri AI
                    </span>
                  </h2>
                  <p className="mt-0.5 text-xs text-emerald-200/80 sm:text-sm">
                    Healthcare assistant · here to help
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                className="shrink-0 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <CloseCircle />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="relative min-h-[12rem] flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:min-h-[16rem] sm:px-4 sm:py-5 md:min-h-[18rem] lg:min-h-[20rem]"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(45,212,191,0.08),transparent_45%),radial-gradient(ellipse_at_80%_30%,rgba(59,130,246,0.06),transparent_40%)]"
              aria-hidden
            />

            <div className="relative flex flex-col gap-5 sm:gap-6">
              {messages.length === 0 && (
                <div className="flex flex-col items-center px-2 py-6 text-center sm:py-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 ring-1 ring-emerald-400/30">
                    <MessageCircle
                      className="h-7 w-7 text-emerald-300/90"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <p className="font-title text-base font-semibold text-white sm:text-lg">
                    Ask us anything
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                    Services, careers, clients, or navigating this site — get
                    quick, friendly answers.
                  </p>
                  <div className="mt-6 flex w-full max-w-md flex-col gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={loading}
                        onClick={() => applySuggestion(prompt)}
                        className="rounded-xl border border-emerald-500/20 bg-slate-800/60 px-4 py-3 text-left text-sm leading-snug text-emerald-50/95 shadow-sm backdrop-blur-sm transition hover:border-emerald-400/40 hover:bg-slate-800/90 hover:text-white disabled:opacity-50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                const senderName = isUser
                  ? msg.senderLabel?.trim() || "Guest"
                  : BOT_SENDER_LABEL;

                return (
                  <div
                    key={idx}
                    className={`flex w-full max-w-full gap-2.5 sm:gap-3 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <SenderAvatar
                      label={senderName}
                      variant={isUser ? "user" : "bot"}
                    />

                    <div
                      className={`flex min-w-0 max-w-[calc(100%-3.25rem)] flex-1 flex-col gap-1 ${
                        isUser ? "items-end" : "items-start"
                      }`}
                    >
                      <span
                        className={`max-w-[12rem] truncate px-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:max-w-[14rem] sm:text-xs ${
                          isUser ? "text-right text-sky-300/90" : "text-emerald-300/80"
                        }`}
                        title={senderName}
                      >
                        {senderName}
                      </span>

                      <div
                        className={`w-full rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:px-4 sm:py-3 sm:text-[0.9375rem] ${
                          isUser
                            ? "rounded-tr-md bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-lg shadow-indigo-950/30"
                            : "rounded-tl-md border border-emerald-500/20 bg-slate-800/85 text-slate-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm"
                        }`}
                      >
                        {msg.content === "..." ? (
                          <span className="flex items-center gap-2 text-sm italic text-emerald-200/70">
                            <span className="inline-flex gap-1">
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.2s]" />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.1s]" />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400" />
                            </span>
                            Thinking…
                          </span>
                        ) : (
                          <span className="whitespace-pre-wrap break-words">
                            {msg.content}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-white/5 bg-slate-950/80 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2.5 sm:gap-3"
            >
              <textarea
                ref={textareaRef}
                className="min-h-[3.25rem] w-full resize-y rounded-2xl border border-slate-600/60 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-100 shadow-inner outline-none ring-emerald-500/0 transition placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/25 sm:min-h-[3.5rem] sm:px-4 sm:py-3 sm:text-base"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                  }
                }}
                rows={3}
                placeholder="Message Nzuri AI…"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 transition hover:brightness-110 hover:shadow-emerald-800/50 disabled:cursor-not-allowed disabled:opacity-55 sm:py-3.5 sm:text-base"
              >
                {loading ? (
                  "Sending…"
                ) : (
                  <>
                    <SendHorizontal className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
                    Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          aria-label="Open Nzuri Healthcare AI assistant — ask questions about our services and this website"
          title="Nzuri AI chatbot"
          className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 text-white shadow-[0_12px_40px_-8px_rgba(16,185,129,0.55)] ring-2 ring-white/25 transition hover:scale-105 hover:shadow-[0_16px_48px_-8px_rgba(16,185,129,0.65)] hover:ring-emerald-200/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/80 sm:h-16 sm:w-16"
          onClick={() => setIsOpen(true)}
        >
          <Sparkles
            className="absolute left-2 top-2 h-3.5 w-3.5 text-amber-200 opacity-95 sm:h-4 sm:w-4"
            strokeWidth={2.5}
            aria-hidden
          />
          <Bot
            className="relative z-[1] h-7 w-7 transition group-hover:scale-105 sm:h-8 sm:w-8"
            strokeWidth={2}
            aria-hidden
          />
        </button>
      )}
    </div>
  );
}
