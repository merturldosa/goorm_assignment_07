import { NotesProvider } from './context/NotesContext';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import styles from './App.module.css';

function App() {
  return (
    <NotesProvider>
      <div className={styles.app}>
        <Sidebar />
        <MainContent />
      </div>
    </NotesProvider>
  );
}

export default App;
