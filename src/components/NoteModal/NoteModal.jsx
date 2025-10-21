import { useState, useEffect } from 'react';
import { useNotes } from '../../context/NotesContext';
import {
  HiXMark,
  HiListBullet,
  HiBars3BottomLeft,
} from 'react-icons/hi2';
import {
  MdFormatBold,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatSize,
  MdImage,
  MdFormatQuote,
  MdCode,
} from 'react-icons/md';
import styles from './NoteModal.module.css';

const NoteModal = ({ note, onClose }) => {
  const { createNote, updateNote, tags } = useNotes();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
    backgroundColor: 'white',
    priority: 'low',
  });

  const [showTagModal, setShowTagModal] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        tags: note.tags,
        backgroundColor: note.backgroundColor,
        priority: note.priority,
      });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (note) {
      updateNote(note.id, formData);
    } else {
      createNote(formData);
    }

    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = (tagName) => {
    if (tagName && !formData.tags.includes(tagName)) {
      handleChange('tags', [...formData.tags, tagName]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    handleChange(
      'tags',
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleNewTagSubmit = () => {
    if (newTag.trim()) {
      handleAddTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{note ? '노트 생성하기' : '노트 생성하기'}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <HiXMark />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="노트 제목"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={styles.titleInput}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.toolbar}>
              <button type="button" className={styles.toolButton} title="불릿 리스트">
                <HiListBullet />
              </button>
              <button type="button" className={styles.toolButton} title="번호 리스트">
                <HiBars3BottomLeft />
              </button>
              <button type="button" className={styles.toolButton} title="볼드">
                <MdFormatBold />
              </button>
              <button type="button" className={styles.toolButton} title="밑줄">
                <MdFormatUnderlined />
              </button>
              <button type="button" className={styles.toolButton} title="취소선">
                <MdFormatStrikethrough />
              </button>
              <button type="button" className={styles.toolButton} title="폰트 크기">
                <MdFormatSize />
              </button>
              <button type="button" className={styles.toolButton} title="이미지">
                <MdImage />
              </button>
              <button type="button" className={styles.toolButton} title="인용구">
                <MdFormatQuote />
              </button>
              <button type="button" className={styles.toolButton} title="코드">
                <MdCode />
              </button>
            </div>

            <textarea
              placeholder="노트 내용을 입력하세요..."
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className={styles.contentTextarea}
              style={{ backgroundColor: formData.backgroundColor === 'white' ? '#FFFFFF' :
                       formData.backgroundColor === 'red' ? '#F8D7DA' :
                       formData.backgroundColor === 'green' ? '#D4EDDA' : '#CCE5FF' }}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.tagsSection}>
              {formData.tags.map((tag) => (
                <span key={tag} className={styles.selectedTag}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className={styles.removeTagButton}
                  >
                    <HiXMark />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={() => setShowTagModal(!showTagModal)}
                className={styles.addTagButton}
              >
                Add Tag
              </button>
            </div>

            {showTagModal && (
              <div className={styles.tagModal}>
                <input
                  type="text"
                  placeholder="new tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNewTagSubmit();
                    }
                  }}
                  className={styles.tagInput}
                />
                <div className={styles.existingTags}>
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        handleAddTag(tag.name);
                        setShowTagModal(false);
                      }}
                      className={styles.existingTag}
                      disabled={formData.tags.includes(tag.name)}
                    >
                      {tag.name} +
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>배경색 :</label>
              <select
                value={formData.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className={styles.select}
              >
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>우선순위 :</label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className={styles.select}
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            + 생성하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
