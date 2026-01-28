import CloseCircle from "@/app/components/icons/closeCircle";
import { FormEvent, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
};

export default function Prompt() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = { role: "user", content: inputText };

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
    <div className="fixed bottom-2 right-4 md:items-center justify-center">
      {isOpen && (
        <div className="w-80 md:w-80 md:h-100 bg-secondary-dark shadow-lg rounded-lg overflow-hidden items-center justify-center">
          <div className="flex flex-col items-center justify-right p-4 space-y-1">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-sm font-normal text-white">
                NzuriHealthcare AI Chatbot
              </h1>
              <button onClick={() => setIsOpen(false)}>
                <CloseCircle />
              </button>
            </div>

            <div className="w-full border p-4 rounded-lg space-y-2 bg-gray-100 h-80 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded font-serif text-14 md:text-12 ${
                    msg.role === "user"
                      ? "bg-blue-400 text-right"
                      : "bg-green-200 text-left"
                  }`}
                >
                  {msg.content === "..." ? (
                    <span className="animate-pulse text-gray-500 italic text-14 md:text-12">
                      Assistant is typing...
                    </span>
                  ) : (
                    msg.content
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full md:items-center space-y-2 justify-center"
            >
              <textarea
                className="w-full border p-2 rounded-md focus:outline-none font-serif text-14 md:text-12"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                  }
                }}
                rows={2}
                placeholder="Type your message here..."
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-[2em] py-[.5em] bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full text-base duration-300 hover:scale-10 transform transition-all ease-in-out font-sans inline-block"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
        >
          💬
        </button>
      )}
    </div>
  );
}
