import { openDB } from 'idb';

const initdb = async () => {
  return openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.put({ content });
    console.log('Data added to the database:', result);
  } catch (error) {
    console.error('Error adding data to the database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.getAll();
    console.log('Data retrieved from the database:', result);
    return result;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    return null;
  }
};

initdb();
