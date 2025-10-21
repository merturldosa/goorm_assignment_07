import { useNotes } from '../../context/NotesContext';
import {
  HiPencil,
  HiTrash,
  HiArchiveBox,
  HiArrowUturnLeft,
  HiXMark
} from 'react-icons/hi2';
import { TbPin, TbPinFilled } from 'react-icons/tb';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './NoteCard.module.css';

const NoteCard = ({ note, onEdit }) => {
  const {
    deleteNote,
    permanentlyDeleteNote,
    restoreNote,
    togglePin,
    toggleArchive,
    currentCategory,
  } = useNotes();

  const getBackgroundColor = () => {
    const colors = {
      white: '#FFFFFF',
      red: '#F8D7DA',
      green: '#D4EDDA',
      blue: '#CCE5FF',
    };
    return colors[note.backgroundColor] || '#FFFFFF';
  };

  const handlePinToggle = (e) => {
    e.stopPropagation();
    togglePin(note.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (currentCategory === 'trash') {
      if (window.confirm('정말로 영구 삭제하시겠습니까?')) {
        permanentlyDeleteNote(note.id);
      }
    } else {
      deleteNote(note.id);
    }
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    toggleArchive(note.id);
  };

  const handleRestore = (e) => {
    e.stopPropagation();
    restoreNote(note.id);
  };

  const truncateContent = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      className={styles.noteCard}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{note.title}</h3>
        <div className={styles.headerActions}>
          {note.priority === 'high' && (
            <span className={styles.priorityBadge}>HIGH</span>
          )}
          {currentCategory !== 'trash' && currentCategory !== 'archive' && (
            <button
              className={styles.iconButton}
              onClick={handlePinToggle}
              title={note.isPinned ? '고정 해제' : '고정'}
            >
              {note.isPinned ? (
                <TbPinFilled className={styles.pinIcon} />
              ) : (
                <TbPin className={styles.pinIcon} />
              )}
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <p>{truncateContent(note.content)}</p>
      </div>

      {note.tags.length > 0 && (
        <div className={styles.tags}>
          {note.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.date}>
          {format(new Date(note.updatedAt), 'yyyy.MM.dd HH:mm', {
            locale: ko,
          })}
        </span>

        <div className={styles.actions}>
          {currentCategory === 'trash' ? (
            <>
              <button
                className={styles.actionButton}
                onClick={handleRestore}
                title="복원"
              >
                <HiArrowUturnLeft />
              </button>
              <button
                className={styles.actionButton}
                onClick={handleDelete}
                title="영구 삭제"
              >
                <HiXMark />
              </button>
            </>
          ) : currentCategory === 'archive' ? (
            <>
              <button
                className={styles.actionButton}
                onClick={handleRestore}
                title="복원"
              >
                <HiArrowUturnLeft />
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.actionButton}
                onClick={handleEdit}
                title="수정"
              >
                <HiPencil />
              </button>
              <button
                className={styles.actionButton}
                onClick={handleArchive}
                title="아카이브"
              >
                <HiArchiveBox />
              </button>
              <button
                className={styles.actionButton}
                onClick={handleDelete}
                title="삭제"
              >
                <HiTrash />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
