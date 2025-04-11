import ErrorLogger from "@/utils/logger/errorLogger";
import { useState } from "react";

const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      })
      .catch((err) => {
        ErrorLogger(`Failed to copy text: ${text}. Error: ${err.message}`);
        setCopied(false);
      });
  };

  return {
    copied,
    copyToClipboard,
  };
};

export default useClipboard;
