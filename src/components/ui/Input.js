import React, { forwardRef } from 'react'; // Ensure forwardRef is imported correctly
import { cn } from '../pagesComponents/pageLayout/cn';
import ReactSelect from 'react-select';

const Input = forwardRef((props, ref) => {
  const {
    className = '',
    wrapperClassName = '',
    labelClassName = '',
    label,
    type = 'text',
    id,
    ...rest
  } = props;

 
const defaultClasses =
  'h-10 px-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed';

  const inputTypes = {
    textarea: (
      <textarea ref={ref} className={cn(defaultClasses, className)} {...rest} />
    ),
    select: (
      <ReactSelect
        ref={ref}
        className={cn(      className,
        )}
        {...rest}
      />
    ),
  };

  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        
        <label
  htmlFor={id}
  className={cn(
    'block mb-2 text-sm font-semibold text-gray-700 capitalize',
    labelClassName,
  )}
/>
      )}
      {inputTypes[type] ?? (
        <input
          ref={ref}
          type={type}
          className={cn(defaultClasses, className)}
          {...rest}
        />
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
