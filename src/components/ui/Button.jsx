import { cn } from '../../utils/cn';
const sizeMap = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
};
const variantMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger'
};

/** Reusable button atom with variant and size presets */
const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return <button className={cn(variantMap[variant], sizeMap[size], className)} {...props}>
      {children}
    </button>;
};
export default Button;