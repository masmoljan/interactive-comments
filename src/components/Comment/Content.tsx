import { Button, ButtonProps } from "../ui/button";
import { Textarea, TextareaProps } from "../ui/textarea";


interface ContentProps extends Omit<TextareaProps, 'onClick'>, Pick<ButtonProps, 'onClick'|'type'> {
  textClassName?: string;
  buttonClassName?: string;
  text?: string;
  icon?: React.ReactNode;
}

export default function Content ({ 
  autoFocus,
  textClassName,
  buttonClassName,
  placeholder,
  defaultValue,
  onChange,
  disabled,
  onClick,
  text,
  icon,
  type,
  value
} : ContentProps) {

  return (
    <>
      <Textarea 
        className={textClassName}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        autoFocus={autoFocus}
        value={value}
      />
      <Button 
        className={buttonClassName}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {text}
        {icon}
      </Button>
    </>
  );
}