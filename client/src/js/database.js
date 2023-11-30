import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { autoIncrement: true, keyPath: 'id' });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const jatedb = await openDB('jate', 1);
  const tx = jatedb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, content: content });
  const result = await request;
  console.log(result, 'data added to database');
  if (!result) {
    console.log('data not added to database');
    return;
  }
  return result;
};

export const getDb = async() => {
  console.log('GET all data from database');
  const jatedb = await openDB('jate', 1);
  const tx = jatedb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('data retrieved from database');
  if (!result) {
    console.log('data not retrieved from database');
    return;
  }
  return result.content;
};

initdb();

