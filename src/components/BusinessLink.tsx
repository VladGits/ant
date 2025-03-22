// import { useNavigate } from 'react-router-dom';
import './BusinessLink.css';

const BusinessLink = () => {
//   const navigate = useNavigate();

  const handleClick = () => {
    // navigate('/business');
  };

  return (
    <div className="business-link" onClick={handleClick}>
      <div className="business-link__icon">
        <img src="./briefcase-image.png" alt="Бизнес" />
      </div>
      <span className="business-link__text">Для бизнеса</span>
    </div>
  );
};

export default BusinessLink; 