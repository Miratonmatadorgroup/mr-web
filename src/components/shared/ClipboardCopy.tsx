import useClipboard from "@/hooks/useClipboard";
import { cn } from "@/utils/cn";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

const ClipboardCopy = ({ text, className }: ClipboardCopyProps) => {
  const { copied, copyToClipboard } = useClipboard();
  return (
    <span
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center",
        className
      )}
      onClick={() => copyToClipboard(text)}
      title="Copy to clipboard"
    >
      {copied ? (
        <IoCheckmarkDone className="size-6" />
      ) : (
        <MdContentCopy className="size-6" />
      )}
    </span>
  );
};

export default ClipboardCopy;

interface ClipboardCopyProps {
  text: string;
  className?: string;
}
