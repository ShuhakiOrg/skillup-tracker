import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
// We no longer need useTranslation
// import { useTranslation } from 'react-i18next'; 
import "./FAQ.css";
import AOS from 'aos';

const FAQ = () => {
  // We remove this line: const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    // Refresh AOS animations when accordion toggles
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  // --- MODIFICATION START ---
  // The questions and answers are now written directly as strings.
  const faqEntries = [
    {
      question: "What is SkillUp Tracker?",
      answer: "SkillUp Tracker is your personal gym for learning. It is a gamified web app designed to help you set goals, track progress, and stay motivated on your learning journey."
    },
    {
      question: "How can I get started?",
      answer: " Getting started is super easy! Create a profile, set your first learning goal, add resources or tasks you complete, and watch your XP grow as you progress!"
    },
    {
      question: "Is SkillUp Tracker free?",
      answer: "SkillUp Tracker is free and open-source! Our mission is to provide a powerful learning tool that helps everyone grow their skills."
    },
    {
      question: "How do I earn XP and level up?",
      answer: "You earn XP for almost every achievement! Completing a module, logging a resource, or finishing a task will boost your points.The more XP you collect, the higher your level, showcasing your dedication."
    },
    {
      question: "Is there a leaderboard?",
      answer: "Yes , Check the leaderboard to see how your total XP compares with other learners. A friendly way to spark competition and stay motivated!"
    }
  ];
  // --- MODIFICATION END ---

  return (
    <section className="faq-container" data-aos="fade-up" data-aos-duration="800">
      {/* The title is also hard-coded now */}
      <h2 data-aos="fade-down" data-aos-delay="200">Frequently Asked Questions</h2>
      
      {faqEntries.map((item, idx) => (
        <div
          key={idx}
          className={`faq-item ${openIndex === idx ? "open" : ""}`}
          data-aos="fade-up"
          data-aos-delay={300 + (idx * 100)}
        >
          <div
            className="faq-question"
            onClick={() => toggle(idx)}
          >
            <h4>{item.question}</h4>
            <FaChevronDown
              className={`arrow ${openIndex === idx ? "rotate" : ""}`}
            />
          </div>
          <div className={`faq-answer ${openIndex === idx ? "show" : ""}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FAQ;