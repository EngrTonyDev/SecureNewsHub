import React, { Component } from 'react'
import { Redirect, Route } from 'react-router';
import { isLogin } from '../utils/auth';

export default class PublicRoute extends Component {
    render() {
        const { component: Component, restricted, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                isLogin() ?
                    <Redirect to="/index" />
                    : <Component {...props} />
            )} />
        )
    }
}
