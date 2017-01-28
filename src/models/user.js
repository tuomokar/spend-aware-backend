
export default {

    findOne: async (db, id) => {
        let userArray;
        try {
            userArray = await db.all('SELECT rowid as id, username FROM user WHERE rowid = ' + id + ' LIMIT 1'); // oops, not very secure
        } catch (ex) {
            return false;
        }

        if (userArray !== undefined && userArray !== null && userArray[0] !== undefined) {
            return userArray[0];
        }
        return false;
    },

    findOneWithUsername: async (db, username) => {
        let userArray;
        try {
            userArray = await db.all("SELECT rowid AS id, username, password FROM user WHERE username = '" + username + "' LIMIT 1");
        } catch(err) {
            return false;
        }

        if (userArray !== undefined && userArray !== null && userArray[0] !== undefined) {
            return userArray[0];
        }
        return false;
    },

    findIdWithUsername: async (db, username) => {
        let userArray;
        try {
            userArray = await db.all('SELECT rowid as id FROM user WHERE rowid = ' + id + ' LIMIT 1');
        } catch(err) {
            return false;
        }

        if (userArray !== undefined && userArray !== null && userArray[0] !== undefined) {
            return userArray[0];
        }

        return false;
    },

    findAll: async (db) => {
        return await db.all('SELECT rowid AS id, username FROM user');
    },

    create: async (db, username, password) => {
        try {
            return await db.all("INSERT INTO user (username, password) VALUES ('" + username + "', '" + password + "')");  // oops, not very secure
        } catch (ex) {
            return false;
        }
        return false;
    },

    update: async (db, password, id) => {
        try {
            return await db.all("UPDATE user SET PASSWORD = '" + password + "' WHERE rowid = " + id); // oops, not very secure
        } catch (ex) {
            return false;
        }
    },

    findUserItems: async (db, userId) => {
        try {
            return await db.all("SELECT rowid AS id, name, cost, date FROM item WHERE creator = " + userId);
        } catch(ex) {
            return false;
        }
    }

}
