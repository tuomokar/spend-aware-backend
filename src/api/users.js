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
        let userInfo = await User.create(db, body.username, body.password);

        if (userInfo !== false) {
            res.json(body);
        }

        res.json({
            success: false,
            message: 'Registration failed, try again'
        });
	},

	/** GET /:id - Return a given entity */
	async read({ user }, res) {
		res.json(user);
	},

	/** PUT /:id - Update a given entity */
	async update({ user, body }, res) {
        user = await User.update(db, body.password, body.id);

        if (user !== false) {
            res.json(user);
        }

        res.json({
            success: false,
            message: 'You failed, try again'
        })
		res.sendStatus(204)
	}

});
