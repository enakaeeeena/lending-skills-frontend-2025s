const Button = ({ children, onClick, variant = 'primary' }) => {
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-black hover:bg-gray-100'
    };
  
    return (
      <button 
        onClick={onClick}
        className={`px-4 py-2 rounded transition ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;