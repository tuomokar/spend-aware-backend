import { version } from '../../package.json';
import { Router } from 'express';
import items from './items';
import users from './users';
import useritems from './useritems';
import authentications from './authentications';


export default ({ config, db }) => {
	let api = Router();

	api.use('/items', items({ config, db }));
    api.use('/users', users({ config, db }));
    api.use('/users/:userId/items', useritems({config, db}));
    api.use('/authenticate', authentications({config, db}));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
