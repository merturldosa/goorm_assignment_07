import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([
    { id: uuidv4(), name: 'coding' },
    { id: uuidv4(), name: 'exercise' },
    { id: uuidv4(), name: 'quotes' },
  ]);
  const [currentCategory, setCurrentCategory] = useState('notes');
  const [searchQuery, setSearchQuery] = useState('');

  // localStorage에서 데이터 로드
  useEffect(() => {
    const savedNotes = localStorage.getItem('keep-notes');
    const savedTags = localStorage.getItem('keep-tags');

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, []);

  // notes 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('keep-notes', JSON.stringify(notes));
  }, [notes]);

  // tags 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('keep-tags', JSON.stringify(tags));
  }, [tags]);

  // 노트 생성
  const createNote = (noteData) => {
    const newNote = {
      id: uuidv4(),
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags || [],
      backgroundColor: noteData.backgroundColor || 'white',
      priority: noteData.priority || 'low',
      isPinned: false,
      isArchived: false,
      isDeleted: false,
      category: currentCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  // 노트 수정
  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  };

  // 노트 삭제 (휴지통으로 이동)
  const deleteNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isDeleted: true } : note
      )
    );
  };

  // 노트 영구 삭제
  const permanentlyDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // 노트 복원
  const restoreNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, isDeleted: false, isArchived: false }
          : note
      )
    );
  };

  // 노트 핀 토글
  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  // 노트 아카이브 토글
  const toggleArchive = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isArchived: !note.isArchived } : note
      )
    );
  };

  // 태그 생성
  const createTag = (tagName) => {
    const existingTag = tags.find(
      (tag) => tag.name.toLowerCase() === tagName.toLowerCase()
    );

    if (existingTag) {
      return existingTag;
    }

    const newTag = {
      id: uuidv4(),
      name: tagName,
      createdAt: new Date().toISOString(),
    };

    setTags((prev) => [...prev, newTag]);
    return newTag;
  };

  // 태그 삭제
  const deleteTag = (tagId) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));

    // 해당 태그를 사용하는 모든 노트에서 제거
    setNotes((prev) =>
      prev.map((note) => ({
        ...note,
        tags: note.tags.filter((tagName) => {
          const tag = tags.find((t) => t.name === tagName);
          return tag && tag.id !== tagId;
        }),
      }))
    );
  };

  // 필터링된 노트 가져오기
  const getFilteredNotes = () => {
    let filtered = notes;

    // 카테고리별 필터링
    if (currentCategory === 'archive') {
      filtered = filtered.filter((note) => note.isArchived);
    } else if (currentCategory === 'trash') {
      filtered = filtered.filter((note) => note.isDeleted);
    } else if (currentCategory === 'edit-notes') {
      filtered = filtered.filter((note) => !note.isDeleted && !note.isArchived);
    } else {
      filtered = filtered.filter(
        (note) =>
          !note.isDeleted &&
          !note.isArchived &&
          (currentCategory === 'notes' || note.tags.includes(currentCategory))
      );
    }

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    // 정렬: 핀 고정 노트가 먼저 나오도록
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return filtered;
  };

  // 핀 고정 노트와 일반 노트 분리
  const getPinnedAndUnpinnedNotes = () => {
    const filtered = getFilteredNotes();
    const pinned = filtered.filter((note) => note.isPinned);
    const unpinned = filtered.filter((note) => !note.isPinned);
    return { pinned, unpinned };
  };

  const value = {
    notes,
    tags,
    currentCategory,
    setCurrentCategory,
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    permanentlyDeleteNote,
    restoreNote,
    togglePin,
    toggleArchive,
    createTag,
    deleteTag,
    getFilteredNotes,
    getPinnedAndUnpinnedNotes,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
