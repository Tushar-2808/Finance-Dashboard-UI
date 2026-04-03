import { cn } from '../../utils/cn';
/** Styled text input with optional label */
const TextInput = ({
  label,
  className,
  id,
  ...props
}) => {
  return <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {label}
        </label>}
      <input id={id} className={cn('input-base', className)} {...props} />
    </div>;
};
export default TextInput;