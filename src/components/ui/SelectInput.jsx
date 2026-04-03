import { cn } from '../../utils/cn';
/** Styled select dropdown with optional label */
const SelectInput = ({
  label,
  options,
  className,
  id,
  ...props
}) => {
  return <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {label}
        </label>}
      <select id={id} className={cn('input-base', 'cursor-pointer', className)} {...props}>
        {options.map(opt => <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>)}
      </select>
    </div>;
};
export default SelectInput;