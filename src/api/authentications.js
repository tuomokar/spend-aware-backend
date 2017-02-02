import app from '../';
import Jwt from 'jsonwebtoken';
import resource from 'resource-router-middleware';

import User from '../models/user';


export default ({ config, db }) => resource({

	/** POST / - Create a new entity */
	async create({ body }, res) {
        let user = await User.findOneWithUsername(db, body.username);

        if (!user || !user.username || user.password !== body.password) {
            res.json({success: false, message: 'Authentication failed, wrong password or username'});
            return;
        }

        let token = Jwt.sign(user, app.get('secret'), {
            expiresIn: 1440
        });

		res.json({
            success: true,
            message: 'Welcome!',
            token: token,
            username: user.username,
            userId: user.id
        });
	}

});
