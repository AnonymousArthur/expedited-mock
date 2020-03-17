import Dexie from "dexie";

interface DBObject {
  [key: string]: any;
}

const db: DBObject = new Dexie("myDb");
db.version(1).stores({
  users: `++id, name`,
  boards: `++id, topic, description, author`,
  messages: `++id, content, author, createdAt, parentId, parentType`
});

export default db;
