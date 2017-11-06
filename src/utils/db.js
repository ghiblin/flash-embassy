import PouchDB from 'pouchdb';
const db = new PouchDB('flash-embassy');

window.db = db;
export default db;
