interface NoticeProps {
  messages: string[];
  border?: boolean;
}
const Notice = ({ messages ,border=true}: NoticeProps) => {
  return (
    <section className="w-full flex items-start justify-center gap-1 flex-col ">
      <ul className={`w-full list-disc list-inside text-sm font-normal text-gray-700 rounded-lg p-3 bg-neutral-100 ${border ? 'border border-gray-200 ' : ''}`}>
        {messages.map((message, index) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>
    </section>
  );
};

export default Notice;