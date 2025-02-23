// Alert.jsx component
const Alert = ({ children, className = "" }) => {
    return (
      <div className={`p-4 rounded-lg border ${className}`}>
        {children}
      </div>
    );
  };
  
  const AlertTitle = ({ children }) => {
    return <h5 className="mb-1 font-medium">{children}</h5>;
  };
  
  const AlertDescription = ({ children, className = "" }) => {
    return <div className={`text-sm ${className}`}>{children}</div>;
  };

  export { Alert, AlertTitle, AlertDescription };