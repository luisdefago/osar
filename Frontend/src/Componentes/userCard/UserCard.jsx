import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/delete.png';
import styles from './UserCard.module.css';
import { useDeleteUser } from '../../hooks/useDeleteUser';

const UserCard = ({ name, id }) => {
  const navigate = useNavigate();
  const { deleteUser } = useDeleteUser();

  const handleClick = () => {
    navigate(`/admin/recibos/${id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/admin/editar/${id}`);
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmed) {
      await deleteUser(id);
    }
  };

  return (
    <div className={styles.userCardContainer} onClick={handleClick}>
      <img
        src={deleteIcon}
        alt="Eliminar"
        className={styles.deleteIcon}
        onClick={handleDeleteClick}
      />
      <span className={styles.userName}>{name}</span>
      <span className={styles.editBtn} onClick={handleEditClick}>Editar</span>
    </div>
  );
};

export default UserCard;
