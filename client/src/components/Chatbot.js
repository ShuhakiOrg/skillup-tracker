import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css"; // your CSS file

const FAQ = [
  {
    triggers: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    response: "Hello 👋! Welcome to <b>SkillUp Tracker</b>. How can I help you today?",
  },
  {
    triggers: ["thanks", "thank you", "thx"],
    response: "You're welcome! 😊 Always here to help.",
  },
  {
    triggers: ["bye", "goodbye", "see you", "later"],
    response: "Goodbye! 👋 Have a productive coding day!",
  },
  {
    triggers: ["what is skillup tracker", "skillup tracker", "about skillup tracker"],
    response: `🧠 <b>SkillUp Tracker</b> is your personal <b>gym for learning</b>!<br>
It is a <b>gamified web app</b> designed to help you <b>set goals</b>, <b>track progress</b>, and stay <b>motivated</b> on your learning journey.`,
  },
  {
    triggers: ["how do i get started", "getting started", "start learning"],
    response: `✨ Getting started is super easy!<br>
- <b>Create a profile</b><br>
- <b>Set your first learning goal</b><br>
- <b>Add resources or tasks</b> you complete<br>
Watch your <b>XP grow</b> as you progress!`,
  },
  {
    triggers: ["what is gamification", "gamification"],
    response: `🎮 <b>Gamification</b> turns learning into a <b>game</b>!<br>
We use <b>XP (Experience Points)</b>, <b>levels</b>, <b>badges</b>, and <b>streaks</b> to make learning <b>fun</b>, <b>engaging</b>, and <b>rewarding</b>.`,
  },
  {
    triggers: ["how do i earn xp", "earn xp", "level up", "xp", "levels"],
    response: `🏆 You earn <b>XP</b> for almost every achievement!<br>
Completing a module, logging a resource, or finishing a task will <b>boost your points</b>.<br>
The more XP you collect, the higher your <b>level</b>, showcasing your <b>dedication</b>.`,
  },
  {
    triggers: ["badges and streaks", "badges", "streaks"],
    response: `🏅 <b>Badges</b> are special awards for reaching milestones, like <b>'Streak Master'</b> or <b>'Quick Learner'</b>.<br>
🔥 <b>Streaks</b> track how many <b>days in a row</b> you work on your goals, helping you build <b>consistent learning habits</b>.`,
  },
  {
    triggers: ["who should use this app", "who is it for", "users"],
    response: `✨ <b>SkillUp Tracker</b> is perfect for <b>self-learners, students, and developers</b>.<br>
Really, it’s for anyone who wants to stay <b>accountable</b> and add <b>fun</b> to their learning goals.`,
  },
  {
    triggers: ["is there a leaderboard", "leaderboard", "competition"],
    response: `🏁 Yes! Check the <b>leaderboard</b> to see how your <b>total XP</b> compares with other learners.<br>
A friendly way to spark <b>competition</b> and stay <b>motivated</b>!`,
  },
  {
    triggers: ["is skillup tracker free","Is SkillUp Tracker free?", "free", "pricing", "cost"],
    response: `🎉 <b>SkillUp Tracker</b> is <b>free</b> and <b>open-source</b>!<br>
Our mission is to provide a <b>powerful learning tool</b> that helps everyone <b>grow their skills</b>.`,
  },
  {
    triggers: [], // fallback
    response: "❌ Sorry, I didn’t understand. Please try asking differently 🙂",
  },
];

const QUICK_QUESTIONS = [
  "What is SkillUp Tracker?",
  "How do I get started?",
  "What is gamification?",
  "How do I earn XP and level up?",
  "Tell me about badges and streaks.",
  "Who should use this app?",
  "Is there a leaderboard?",
  "Is SkillUp Tracker free?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am <b>Skillup Tracker Assistant</b>. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [showFirstFour, setShowFirstFour] = useState(true);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const findResponse = (text) => {
    const lc = text.toLowerCase();

    const sortedFAQ = [...FAQ].sort((a, b) => {
      const maxA = Math.max(...a.triggers.map((t) => t.length), 0);
      const maxB = Math.max(...b.triggers.map((t) => t.length), 0);
      return maxB - maxA;
    });

    for (const item of sortedFAQ) {
      if (item.triggers.some((trig) => lc.includes(trig.toLowerCase()))) {
        return item.response;
      }
    }

    return FAQ.find((i) => i.triggers.length === 0).response;
  };

  const sendMessage = (customText) => {
    const text = customText || input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");

    setTimeout(() => {
      const response = findResponse(text);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 500);
  };

  const toggleQuickQuestions = () => {
    setShowFirstFour(!showFirstFour);
  };

  const renderQuickQuestions = () => {
    const questionsToShow = showFirstFour ? QUICK_QUESTIONS.slice(0, 4) : QUICK_QUESTIONS.slice(4, 8);
    return (
      <>
        {questionsToShow.map((q, i) => (
          <button key={i} className="quick-question-btn" onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
        <button className="quick-question-btn toggle-btn" onClick={toggleQuickQuestions}>
          {showFirstFour ? "See More" : "See Less"}
        </button>
      </>
    );
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window open">
          <div className="chatbot-header">
            <img 
  src="public/Skillup Tracker-logo-white.svg" 
  alt="" 
  className="chatbot-header-logo" 
/>
            <span>Skillup Tracker</span>
            <button onClick={toggleChat}>
              <img
                src="/close.png"
                alt="Close"
              />
            </button>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.sender}-msg`}>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          <div className="quick-questions">{renderQuickQuestions()}</div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              placeholder="Ask me..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>
              <img src="/send.png" alt="Send" />
            </button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        🤖
      </button>
    </div>
  );
};

export default Chatbot;
