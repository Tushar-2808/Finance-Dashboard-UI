import { cn } from '../../utils/cn';
/** Small colored badge for category labels and status pills */
const Badge = ({
  color = 'bg-gray-100 dark:bg-gray-800',
  textColor = 'text-gray-700 dark:text-gray-300',
  className,
  children
}) => {
  return <span className={cn('badge', color, textColor, className)}>
      {children}
    </span>;
};
export default Badge;