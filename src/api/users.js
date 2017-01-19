import resource from 'resource-router-middleware';
import User from '../models/user';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'user',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	async load(req, id, callback) {
        let user = await User.findOne(db, id);
        let err = user ? null : 'Not found';
		callback(err, user);
	},

	/** GET / - List all entities */
	async index({ params },  res) {
        let allUsers = await User.findAll(db);
		res.json(allUsers);
	},

	/** POST / - Create a new entity */
	async create({ body }, res) {
        User.create(db, body.username, body.password);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	async read({ user }, res) {
		res.json(user);
	},

	/** PUT /:id - Update a given entity */
	async update({ user, body }, res) {
        await User.update(db, body.password, body.id);
		res.sendStatus(204);
	},

});
