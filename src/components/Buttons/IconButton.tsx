import { Button, ButtonProps } from "../ui/button";

export interface IconButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  text?: string;
}

export default function IconButton({ 
  className,
  disabled,
  icon,
  onClick,
  size, 
  text,
  variant
} : IconButtonProps) {

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <p className="hidden sm:block">{text}</p>
    </Button>
  );
}