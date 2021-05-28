export interface RadioButtonProps {
  checked?: boolean;
  name: string;
  value: string | number;
  onChange?: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}
