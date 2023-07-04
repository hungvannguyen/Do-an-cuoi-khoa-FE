import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://tawk.to/chat/60c9603365b7290ac6362acd/1f899vikc";

    document.head.appendChild(s);

    return () => {
      document.head.removeChild(s);
    };
  }, []);

  return null;
};

export default Chatbot;
