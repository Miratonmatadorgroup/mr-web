import { HiArrowLeft } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

interface NavProps {
    url: string | (() => void);
    text: string;
    title: string;
}

const NavigationHeader = ({ url, text, title, }: NavProps) => {
    const handleClick = () => {
        if (typeof url === 'function') {
            url(); // Call the function if `url` is a function
        }
    };

    return (
        <div className="flex items-start gap-3">
            {typeof url === 'string' ? (
                <Link
                    to={url}
                    className="flex items-center px-3 py-2 rounded-md cursor-pointer border border-[var(--gray)] justify-center"
                >
                    <HiArrowLeft />
                </Link>
            ) : (
                <button
                    type="button"
                    title='navigation back'
                    onClick={handleClick}
                    className="flex items-center px-3 py-2 rounded-md cursor-pointer border border-[var(--gray)] justify-center"
                >
                    <HiArrowLeft />
                </button>
            )}

            <div className="flex items-start flex-col gap-5 ">
                <div className="flex items-start flex-col gap-1">
                    <div className="text-[20px] md:text-[25px] font-bold">{title}</div>
                    <div className="text-sm md:text-base">{text}</div>
                </div>
            </div>
        </div>
    );
};

export default NavigationHeader;