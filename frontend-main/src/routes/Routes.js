import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Index from '../pages/Index';
import Categories from '../pages/Categories';
import Source from '../pages/Source';
import news from '../pages/news';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path="/" component={Login} />
				<PublicRoute exact path="/register" component={Register} />
				<PrivateRoute exact path="/index" component={Index} />
				<PrivateRoute exact adminPermissions path="/categories" component={Categories} />
				<PrivateRoute exact path="/sources" component={Source} />
				<PrivateRoute exact path="/news" component={news} />
			</Switch>
		</BrowserRouter>

	);
}

export default Routes;
