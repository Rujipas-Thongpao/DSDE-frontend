import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const useTypewriter = (text: string, speed = 50) => {
    const [displayText, setDisplayText] = useState("");
    const [done, setDone] = useState(false);
  
    useEffect(() => {
      let i = 0;
      const type = () => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
          if (i > text.length) {
            setDone(true); // ✅ Now runs when typing finishes
          } else {
            setTimeout(type, speed);
          }
        }
      };
      type();
  
      return () => {}; // Optional cleanup
    }, [text, speed]);
  
    return { displayText, done };
  };
  

interface TypewriterProps {
  text: string;
  speed?: number; // Speed in milliseconds
  onDone?: () => void; // Callback when typing is done
}

const Typewriter = ({ text, speed, onDone }: TypewriterProps) => {
  const { displayText, done } = useTypewriter(text, speed || 10);
  
  useEffect(() => {
    if (done && onDone) {
      onDone();
    }
  }, [done, onDone]);

  return <ReactMarkdown>{displayText}</ReactMarkdown>;
};

export default Typewriter;
