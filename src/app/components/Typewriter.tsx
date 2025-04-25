import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const useTypewriter = (text: string, speed = 50) => {
    const [displayText, setDisplayText] = useState("");
  
    useEffect(() => {
      let i = 0;
      const type = () => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
          setTimeout(type, speed);
        }
      };
      type();
  
      return () => {};
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
