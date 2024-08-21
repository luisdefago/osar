import { useNavigate } from 'react-router-dom';
import styles from './UserCard.module.css';

const UserCard = ({ name, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/recibos/${id}`);
  };

  return (
    <div className={styles.userCardContainer} onClick={handleClick}>
      <span className={styles.userName}>{name}</span>
      <span className={styles.arrowIcon}>{'>'}</span>
    </div>
  );
};

export default UserCard;