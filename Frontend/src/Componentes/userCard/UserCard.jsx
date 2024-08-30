import { useNavigate } from 'react-router-dom';
import styles from './UserCard.module.css';

const UserCard = ({ name, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/recibos/${id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    navigate(`/admin/editar/${id}`);
  };

  return (
    <div className={styles.userCardContainer} onClick={handleClick}>
      <span className={styles.userName}>{name}</span>
      <span className={styles.editBtn} onClick={handleEditClick}>Editar</span>
    </div>
  );
};

export default UserCard;
