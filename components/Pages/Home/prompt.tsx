"use client";

import CloseCircle from "@/app/components/icons/closeCircle";
import { Bot, Sparkles } from "lucide-react";
import { useSupabaseBrowser } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import { FormEvent, useEffect, useState } from "react";

const BOT_SENDER_LABEL = "Nzuri AI Bot";

interface Message {
  role: "user" | "assistant";
  content: string;
  /** Shown beside user bubbles; captured when the message is sent. */
  senderLabel?: string;
}

function pickUserDisplayName(user: User | null): string {
  if (!user) return "Guest";
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  if (meta?.username && typeof meta.username === "string" && meta.username.trim()) {
    return meta.username.trim();
  }
  if (meta?.full_name && typeof meta.full_name === "string" && meta.full_name.trim()) {
    return meta.full_name.trim();
  }
  if (user.email) {
    const local = user.email.split("@")[0]?.trim();
    if (local) return local;
  }
  return "You";
}

function SenderAvatar({ label, variant }: { label: string; variant: "bot" | "user" }) {
  const initial = (label.trim().charAt(0) || "?").toUpperCase();
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm sm:h-9 sm:w-9 sm:text-sm ${
        variant === "bot"
          ? "bg-gradient-to-br from-emerald-600 to-teal-700"
          : "bg-gradient-to-br from-blue-600 to-indigo-700"
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

  useEffect(() => {
    let cancelled = false;

    const refreshUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!cancelled) setUserDisplayName(pickUserDisplayName(user));
    };

    void refreshUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) setUserDisplayName(pickUserDisplayName(session?.user ?? null));
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

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
    } catch (error) {
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

  return (
    <div className="fixed bottom-0 right-0 z-40 flex flex-col items-stretch gap-3 p-3 sm:items-end sm:p-4">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Nzuri Healthcare AI chat"
          className="flex w-full max-h-[min(88dvh,52rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-secondary-dark shadow-2xl sm:max-h-[min(85dvh,48rem)] sm:w-[min(100%,24rem)] md:w-[min(100%,28rem)] lg:w-[min(100%,34rem)] xl:w-[min(100%,38rem)] 2xl:w-[42rem]"
        >
          <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4 md:p-5">
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 pb-3">
              <h1 className="text-base font-semibold tracking-tight text-white sm:text-lg md:text-xl">
                NzuriHealthcare AI Chatbot
              </h1>
              <button
                type="button"
                aria-label="Close chat"
                className="rounded-full p-1 text-white/90 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <CloseCircle />
              </button>
            </div>

            <div className="min-h-[12rem] flex-1 overflow-y-auto overscroll-contain rounded-xl border border-gray-200/80 bg-gray-50 p-3 sm:min-h-[16rem] sm:p-4 md:min-h-[18rem] lg:min-h-[22rem]">
              <div className="flex flex-col gap-4 sm:gap-5">
                {messages.map((msg, idx) => {
                  const isUser = msg.role === "user";
                  const senderName = isUser
                    ? msg.senderLabel?.trim() || "Guest"
                    : BOT_SENDER_LABEL;

                  return (
                    <div
                      key={idx}
                      className={`flex w-full max-w-full gap-2 sm:gap-3 ${
                        isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <SenderAvatar label={senderName} variant={isUser ? "user" : "bot"} />

                      <div
                        className={`flex min-w-0 max-w-[calc(100%-3rem)] flex-1 flex-col gap-1 ${
                          isUser ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 px-0.5 ${
                            isUser ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <span
                            className={`max-w-[11rem] truncate text-xs font-semibold tracking-tight sm:max-w-[14rem] sm:text-sm ${
                              isUser ? "text-blue-900" : "text-emerald-900"
                            }`}
                            title={senderName}
                          >
                            {senderName}
                          </span>
                        </div>

                        <div
                          className={`w-full rounded-2xl px-3 py-2.5 text-sm leading-relaxed shadow-sm sm:px-4 sm:py-3 sm:text-base ${
                            isUser
                              ? "rounded-tr-sm bg-blue-600 text-white"
                              : "rounded-tl-sm bg-white text-gray-900 ring-1 ring-gray-200"
                          }`}
                        >
                          {msg.content === "..." ? (
                            <span className="block animate-pulse text-sm italic text-gray-500 sm:text-base">
                              {BOT_SENDER_LABEL} is typing…
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

            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 flex-col gap-2 sm:gap-3"
            >
              <textarea
                className="min-h-[3.25rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-inner outline-none ring-emerald-500/30 transition placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 sm:min-h-[3.5rem] sm:px-4 sm:py-3 sm:text-base"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                  }
                }}
                rows={3}
                placeholder="Ask anything about Nzuri Healthcare"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-blue-900 to-green-700 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5 sm:text-base"
              >
                {loading ? "Sending…" : "Send"}
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
          className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-800 text-white shadow-xl ring-2 ring-white/30 transition hover:scale-105 hover:shadow-2xl hover:ring-white/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 sm:h-16 sm:w-16"
          onClick={() => setIsOpen(true)}
        >
          <Sparkles
            className="absolute left-2 top-2 h-3.5 w-3.5 text-amber-200 opacity-90 sm:h-4 sm:w-4"
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
