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
        await Item.create(db, body.name, body.username);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	async read({ item }, res) {
		res.json(item);
	},

	/** PUT /:id - Update a given entity */
	async update({ item, body }, res) {
        await Item.update(db, body.name, body.id);
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	async delete({ item }, res) {
        await db.all('DELETE FROM item WHERE rowid = ' + item.id);     // oops, not very secure
		res.sendStatus(204);
	}
});
