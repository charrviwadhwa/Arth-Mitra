import React, { useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "YOUR_OPENAI_API_KEY", dangerouslyAllowBrowser: true });

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "system", content: "Hello! How can I help you today?" }]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: newMessages,
      });

      setMessages([...newMessages, { role: "assistant", content: response.choices[0].message.content }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button onClick={toggleChatbot} className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg p-4 border">
          <div className="h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 my-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <span className={`px-3 py-2 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-l"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
