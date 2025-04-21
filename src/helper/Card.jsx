// src/components/common/Card.jsx
import { useTheme } from '../../context/ThemeContext';

function Card({ title, children, color = 'primary', expandable = true }) {
  const theme = useTheme();
  
  const headerColors = {
    primary: 'bg-blue-500',
    secondary: 'bg-green-500',
    accent: 'bg-purple-500'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-96">
      <div className={`${headerColors[color]} text-white px-4 py-3 flex justify-between items-center`}>
        <h2 className="text-xl font-semibold">{title}</h2>
        {expandable && (
          <button className="text-white hover:bg-white/20 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8h8V6z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      <div className="p-4 overflow-y-auto" style={{height: "calc(100% - 48px)"}}>
        {children}
      </div>
    </div>
  );
}

export default Card;