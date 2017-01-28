import resource from 'resource-router-middleware';
import User from '../models/user';

export default ({ config, db }) => resource({

    mergeParams: true,

	/** GET / - List all entities */
	async index({ params },  res) {
        let userId = params.userId;

        let useritems = await User.findUserItems(db, userId);
		res.json(useritems);
	}

});
