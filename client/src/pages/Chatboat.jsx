import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import { FaRobot, FaPaperPlane, FaComments } from "react-icons/fa";


const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 Ask me about events, locations, or categories!",
    },
  ]);

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");

    try {
      const res = await API.post("/chat", {
        message: userInput,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Something went wrong",
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <FaComments size={24} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-zinc-900 border border-yellow-400 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="bg-yellow-400 text-black p-4 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <FaRobot />
              <span>CircleUp Assistant</span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 whitespace-pre-line text-sm leading-6 rounded-2xl max-w-[80%] text-sm ${
                    msg.sender === "user"
                      ? "bg-zinc-700 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-zinc-700 bg-zinc-900 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about events..."
              className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-full outline-none border border-zinc-700 focus:border-yellow-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;