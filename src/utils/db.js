import PouchDB from 'pouchdb';
const db = new PouchDB('flash-embassy', {revs_limit: 1, auto_compaction: true});

window.db = db;
export default db;
