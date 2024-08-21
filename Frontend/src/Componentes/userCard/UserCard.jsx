import styles from './UserCard.module.css';
const UserCard = ({ name }) => {
    return (
      <div className={styles.userCardContainer}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.arrowIcon}>{'>'}</span>
      </div>
    );
  };
  
  export default UserCard;