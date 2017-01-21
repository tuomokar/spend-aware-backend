export default {

    findOne: async (db, id) => {
        return await db.all('SELECT rowid AS id, name FROM item WHERE rowid = ' + id + ' LIMIT 1'); // oops, not very secure
    },

    findAll: async (db) => {
        return await db.all('SELECT rowid as id, name FROM item');
    },

    create: async (db, name) => {
        return await db.all("INSERT INTO item (name) VALUES ('" + name + "')");  // oops, not very secure
    },

    update: async (db, name, id) => {
        return await db.all("UPDATE item SET name = '" + name + "' WHERE rowid = " + id); // oops, not very secure
    },

    delete: async (db, id) => {
        return await db.all('DELETE FROM item WHERE rowid = ' + id);   // oops, not very secure
    }

};
