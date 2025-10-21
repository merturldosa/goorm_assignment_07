import { useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import { HiPlus, HiMagnifyingGlass } from 'react-icons/hi2';
import NoteCard from '../NoteCard/NoteCard';
import NoteModal from '../NoteModal/NoteModal';
import styles from './MainContent.module.css';

const MainContent = () => {
  const {
    currentCategory,
    searchQuery,
    setSearchQuery,
    getPinnedAndUnpinnedNotes,
  } = useNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const { pinned, unpinned } = getPinnedAndUnpinnedNotes();

  const getCategoryTitle = () => {
    const titles = {
      notes: 'Notes',
      coding: 'Coding',
      exercise: 'Exercise',
      quotes: 'Quotes',
      'edit-notes': 'Edit Notes',
      archive: 'Archive',
      trash: 'Trash',
    };
    return titles[currentCategory] || 'Notes';
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  return (
    <main className={styles.mainContent}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>{getCategoryTitle()}</h2>
          <button className={styles.addButton} onClick={handleCreateNote}>
            <HiPlus />
          </button>
        </div>

        {currentCategory !== 'trash' && currentCategory !== 'archive' && (
          <div className={styles.searchBar}>
            <HiMagnifyingGlass className={styles.searchIcon} />
            <input
              type="text"
              placeholder="노트의 제목을 검색해주세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        )}
      </header>

      <div className={styles.content}>
        {pinned.length > 0 && currentCategory !== 'trash' && currentCategory !== 'archive' && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Pinned Notes ({pinned.length})</h3>
            <div className={styles.grid}>
              {pinned.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                />
              ))}
            </div>
          </section>
        )}

        {unpinned.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              {currentCategory === 'trash' || currentCategory === 'archive'
                ? `${getCategoryTitle()} (${unpinned.length})`
                : `All Notes (${unpinned.length})`}
            </h3>
            <div className={styles.grid}>
              {unpinned.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                />
              ))}
            </div>
          </section>
        )}

        {pinned.length === 0 && unpinned.length === 0 && (
          <div className={styles.emptyState}>
            <p>노트가 없습니다.</p>
            {currentCategory !== 'trash' && currentCategory !== 'archive' && (
              <button className={styles.emptyStateButton} onClick={handleCreateNote}>
                <HiPlus /> 노트 생성하기
              </button>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <NoteModal
          note={editingNote}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default MainContent;
