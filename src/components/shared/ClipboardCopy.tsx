import { cn } from "@/utils/cn";
import { MdContentCopy } from "react-icons/md";

const ClipboardCopy = ({ text, className }: ClipboardCopyProps) => {
  return (
    <span
      className={cn(
        "w-12 h-12 bg-green-200 rounded-full flex items-center justify-center",
        className
      )}
      onCopy={() => text}
    >
      <MdContentCopy className="text-green-500 size-6" />
    </span>
  );
};

export default ClipboardCopy;

interface ClipboardCopyProps {
  text: string;
  className?: string;
}
