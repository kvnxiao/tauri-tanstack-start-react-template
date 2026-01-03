interface RoundedButtonProps {
  onClick: () => void;
  title: string;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  onClick,
  title,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-full bg-linear-to-r from-teal-500 to-cyan-500 transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 text-neutral-800 border border-transparent hover:border-green-200 hover:text-neutral-900"
    >
      {title}
    </button>
  );
};
