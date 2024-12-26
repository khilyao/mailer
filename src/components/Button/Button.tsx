interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: IButtonProps) => {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-base w-max transition-colors ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
