import resource from 'resource-router-middleware';
import Item from '../models/item';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'item',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	async load(req, id, callback) {
        let item = await Item.findOne(db, id);
        let err = item ? null : 'Not found';
		callback(err, item);
	},

	/** GET / - List all entities */
	async index({ params },  res) {
        let allItems = await Item.findAll(db);
		res.json(allItems);
	},

	/** POST / - Create a new entity */
	async create({ body }, res) {
        let item = await Item.create(db, body.item, body.user);

        if (item !== false) {
            res.json(body);
        }

        res.json({
            success: false,
            message: 'You failed, try again'
        });
	},

	/** GET /:id - Return a given entity */
	async read({ item }, res) {
		res.json(item);
	},

	/** PUT /:id - Update a given entity */
	async update({ item, body }, res) {
        let item = await Item.update(db, body.name, body.id);

        if (item !== false) {
            res.json(body);
        }

        res.json({
            success: false,
            message: 'You failed, try again'
        });
	},

	/** DELETE /:id - Delete a given entity */
	async delete({ item }, res) {
        let item = await db.all('DELETE FROM item WHERE rowid = ' + item.id);     // oops, not very secure
        if (item !== false) {
            res.json(item);
        }

        res.json({
            success: false,
            message: 'You failed, try again'
        });
	}
});
