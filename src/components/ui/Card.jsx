import { cn } from '../../utils/cn';
/** Reusable card container with optional hover-lift effect */
const Card = ({
  hover = false,
  className,
  children,
  ...props
}) => {
  return <div className={cn(hover ? 'card-hover' : 'card', 'p-5', className)} {...props}>
      {children}
    </div>;
};
export default Card;