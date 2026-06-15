
export default function GridContainer(props) {
  const { children, className } = props;
  return (
   
    <ul
      {...props}
      className={`
        grid 
        grid-cols-2 
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-7  
        gap-2
        ${className}
      `}
    >
      {children}
    </ul>

  );
}
