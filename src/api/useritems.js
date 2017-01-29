
import Item from '../models/item';
import resource from 'resource-router-middleware';
import User from '../models/user';

export default ({ config, db }) => resource({

    /** Property name to store preloaded entity on `request`. */
	id : 'item',

    mergeParams: true,

	/** GET / - List all single user's items */
	async index({ params },  res) {
        let userItems = await User.findUserItems(db, params.userId);

		res.json(userItems);
	},

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	async load(req, itemName, callback) {
        let item = await Item.findOneWIthCollectiveInfo(db, itemName, req.params.userId);
        let err = item ? null : 'Not found';
		callback(err, item);
	},

    /** GET /:id - Return a given entity */
	async read({ item }, res) {
		res.json(item);
	},

});
