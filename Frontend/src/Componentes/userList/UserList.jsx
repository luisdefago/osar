import { useState } from 'react';
import { useStore } from '../../store/store';
import UserCard from '../userCard/UserCard';
import styles from './UserList.module.css';

const UserList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const users = useStore((state) => state.users);

    if (!users) {
        return <div></div>;
    }

    const filteredUsers = users.filter((user) =>
        user.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
        className={
            filteredUsers.length > 0
            ? styles.userListContainerWithUsers
            : styles.userListContainerEmpty
        }
        >
            <div className={styles.searchContainer}>
                <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                />
            </div>
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                <UserCard key={index} name={user.nombreCompleto} id={user.id}/>
                ))
            ) : (
                <div className={styles.emptyMessage}>No hay usuarios disponibles.</div>
            )}
        </div>
    );
};

export default UserList;