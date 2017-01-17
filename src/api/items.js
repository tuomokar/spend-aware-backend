import resource from 'resource-router-middleware';
import items from '../models/items';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'item',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let item = facets.find( item => item.id === id ),
			err = item ? null : 'Not found';
		callback(err, facet);
	},

	/** GET / - List all entities */
	async index({ params },  res) {
        let allItems = await db.all('SELECT * FROM item');
		res.json(allItems);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = items.length.toString(36);
		items.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ item }, res) {
		res.json(item);
	},

	/** PUT /:id - Update a given entity */
	update({ item, body }, res) {
		for (let key in body) {
			if (key !== 'id') {
				item[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ item }, res) {
		items.splice(items.indexOf(item), 1);
		res.sendStatus(204);
	}
});
