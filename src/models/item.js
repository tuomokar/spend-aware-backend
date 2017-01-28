export default {

    findOne: async (db, id) => {
        try {
            return await db.all('SELECT rowid AS id, name FROM item WHERE rowid = ' + id + ' LIMIT 1'); // oops, not very secure
        } catch(ex) {
            return false;
        }
    },

    findAll: async (db) => {
        try {
            return await db.all('SELECT rowid as id, name FROM item');
        } catch(ex) {
            return false;
        }
    },

    create: async (db, name, username) => {
        let userQuery = "(SELECT rowid FROM user WHERE username = '" + username + "')";
        try {
            return await db.all("INSERT INTO item (name, creator) VALUES ('" + name + "', " + userQuery + ")");  // oops, not very secure
        } catch(ex) {
            return false;
        }
    },

    update: async (db, name, id) => {
        try {
            return await db.all("UPDATE item SET name = '" + name + "' WHERE rowid = " + id); // oops, not very secure
        } catch(ex) {
            return false;
        }
    },

    delete: async (db, id) => {
        try {
            return await db.all('DELETE FROM item WHERE rowid = ' + id);   // oops, not very secure
        } catch(ex) {
            return false;
        }
    }

};
