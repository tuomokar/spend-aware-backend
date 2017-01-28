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

    create: async (db, item, user) => {
        if (!item || !user) {
            return false;
        }

        let itemName = item.name;
        let cost = item.cost;
        let creator = user.id;

        if (!itemName || !cost || !creator) {
            return false;
        }
        let date = Date();

        try {
            return await db.all("INSERT INTO item (name, creator, cost, date) VALUES ('" + itemName + "', " + creator + ", " + cost + ", '" + date + "')");  // oops, not very secure
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
