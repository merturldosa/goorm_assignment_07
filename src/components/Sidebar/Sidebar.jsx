import { useNotes } from '../../context/NotesContext';
import {
  HiLightBulb,
  HiTag,
  HiPencil,
  HiArchiveBox,
  HiTrash
} from 'react-icons/hi2';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { currentCategory, setCurrentCategory, tags } = useNotes();

  const menuItems = [
    { id: 'notes', label: 'Notes', icon: HiLightBulb },
    { id: 'coding', label: 'Coding', icon: HiTag },
    { id: 'exercise', label: 'Exercise', icon: HiTag },
    { id: 'quotes', label: 'Quotes', icon: HiTag },
    { id: 'edit-notes', label: 'Edit Notes', icon: HiPencil },
    { id: 'archive', label: 'Archive', icon: HiArchiveBox },
    { id: 'trash', label: 'Trash', icon: HiTrash },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Keep</h1>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`${styles.menuItem} ${
                    currentCategory === item.id ? styles.active : ''
                  }`}
                  onClick={() => setCurrentCategory(item.id)}
                >
                  <Icon className={styles.icon} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
