
export default {

    findOne: async (db, id) => {
        let userArray = await db.all('SELECT rowid as id, username FROM user WHERE rowid = ' + id + ' LIMIT 1'); // oops, not very secure

        if (userArray !== undefined && userArray !== null && userArray[0] !== undefined) {
            return userArray[0];
        }
    },

    findOneWithUsername: async(db, username) => {
            let userArray;
            try {
                userArray = await db.all("SELECT username, password FROM user WHERE username = '" + username + "' LIMIT 1");
            } catch(err) {
                return err;
            }

            if (userArray !== undefined && userArray !== null && userArray[0] !== undefined) {
                return userArray[0];
            }
    },

    findAll: async (db) => {
        return await db.all('SELECT rowid AS id, username, password FROM user');
    },

    create: async (db, username, password) => {
        return await db.all("INSERT INTO user (username, password) VALUES ('" + username + "', '" + password + "')");  // oops, not very secure
    },

    update: async (db, password, id) => {
        return await db.all("UPDATE user SET PASSWORD = '" + password + "' WHERE rowid = " + id); // oops, not very secure
    }

}
