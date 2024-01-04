import React, { Component } from 'react'
import { Redirect, Route } from 'react-router';
import { isAdmin, isLogin } from '../utils/auth';

export default class PrivateRoute extends Component {
    render() {

        const { component: Component, adminPermissions, ...rest } = this.props;

        return (
            <Route {...rest} render={props => {
                if (isLogin()) {
                    if (adminPermissions) {
                        if (isAdmin()) {
                            return <Component {...props} />;
                        }else{
                            return <Redirect to="/index" />;
                        }
                    } else {
                        return <Component {...props} />;
                    }
                } else {
                    return <Redirect to="/" />;
                }
            }} />
        )
    }
}
