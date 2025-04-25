import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

interface TypewriterProps {
  text: string;
  speed?: number; // Speed in milliseconds
}

const Typewriter = ({ text, speed }: TypewriterProps) => {
  const displayText = useTypewriter(text, speed || 10);

  return <ReactMarkdown>{displayText}</ReactMarkdown>;
};

export default Typewriter;
