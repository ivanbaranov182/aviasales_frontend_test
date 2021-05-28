export interface CheckboxProps {
  checked?: boolean;
  name: string;
  value: string | number;
  onChange?: () => void;
  label?: string;
  disabled?: boolean;
}
