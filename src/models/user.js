
export default {

    findOne: async (db, id) => {
        return await db.all('SELECT rowid as id, username FROM user WHERE rowid = ' + id + ' LIMIT 1'); // oops, not very secure
    },

    findAll: async (db) => {
        return await db.all('SELECT rowid AS id, username FROM user');
    },

    create: async (db, username, password) => {
        return await db.all("INSERT INTO user (username, password) VALUES ('" + username + "', '" + password + "')");  // oops, not very secure
    },

    update: async (db, password, id) => {
        return await db.all("UPDATE user SET PASSWORD = '" + password + "' WHERE rowid = " + id); // oops, not very secure
    }

}
