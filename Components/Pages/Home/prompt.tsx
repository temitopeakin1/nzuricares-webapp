import CloseCircle from "@/app/components/icons/closeCircle";
import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

export default function Prompt() {
  const [messages, setMessages] = useState<Message[]>([]); 
  const [inputText, setInputText] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = { role: "user", parts: [{ text: inputText }] };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    // declare the api key connection with the env
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: messages.concat(userMessage) }),
        }
      );

      const data = await response.json();

      const modelResponse: Message = {
        role: "model",
        parts: [
          { text: data?.generatedContent || "No response from the model." },
        ],
      };

      setMessages((prev) => [...prev, modelResponse]);
    } catch (error) {
      console.error("Error communicating with the Gemini API:", error);
      const errorResponse: Message = {
        role: "model",
        parts: [{ text: "An error occurred. Please try again." }],
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Chat Interface */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-gray-800 shadow-lg rounded-lg overflow-hidden mt-4">
          <div className="flex flex-col items-center justify-right p-4 space-y-4">
            {/* Header with title and close button */}
            <div className="w-full flex justify-between items-center">
              <h1 className="text-sm font-semibold text-white">NzuriHealthcare AI Chatbot</h1>
              <button
                onClick={() => setIsOpen(false)} 
              >
                <CloseCircle/>
              </button>
            </div>

            {/* Chat messages */}
            <div className="w-full border p-4 rounded-lg space-y-2 bg-gray-100 h-80 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded font-serif ${
                    msg.role === "user"
                      ? "bg-blue-200 text-right"
                      : "bg-green-200 text-left"
                  }`}
                >
                  {msg.parts.map((part, index) => (
                    <p key={index}>{part.text}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="w-full space-y-2">
              <textarea
                className="w-full border p-2 rounded-md focus:outline-none font-serif"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
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

      {/* Toggle button for opening the chat interface */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-800 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-blue-700"
        >
          💬
        </button>
      )}
    </div>
  );
}
