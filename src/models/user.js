
export default {

    findOne: async (db, id) => {
        if (!id) {
            return false;
        }

        let userArray;
        try {
            userArray = await db.all('SELECT rowid as id, username from user where rowid = ' + id); // oops, not very secure
            console.log(userArray);
        } catch (ex) {
            console.log('  returning false');
            return false;
        }

        if (userArray !== undefined && userArray !== null && userArray[0] !== undefined) {
            if (userArray.length > 1) {
                return userArray;
            }
            return userArray[0];
        }
        return false;
    },

    findOneWithUsername: async (db, username) => {
        if (!username) {
            return false;
        }

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
        if (!username) {
            return false;
        }

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
        if (!username || !password) {
            return false;
        }

        try {
            return await db.all("INSERT INTO user (username, password) VALUES ('" + username + "', '" + password + "')");  // oops, not very secure
        } catch (ex) {
            return false;
        }
        return false;
    },

    update: async (db, password, id) => {
        if (!password || !id) {
            return false;
        }

        try {
            return await db.all("UPDATE user SET PASSWORD = '" + password + "' WHERE rowid = " + id); // oops, not very secure
        } catch (ex) {
            return false;
        }
    },

    findUserItems: async (db, userId) => {
        if (!userId) {
            return false;
        }
        try {
            return await db.all("SELECT DISTINCT name FROM item WHERE creator = " + userId);
        } catch(ex) {
            return false;
        }
    }

}
