import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAdmin } from "../utils/auth";


class NavbarCover extends Component {

	logout = () => {
		localStorage.removeItem('token');
		this.props.history.replace('/');
	}


	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/index">My Cover</Link>

					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{
								isAdmin() &&
								<li className="nav-item">
									<Link className="nav-link" to="/categories">Categorías</Link>
								</li>
							}
							<li className="nav-item">
								<Link className="nav-link" to="/sources">Recursos</Link>
							</li>

						</ul>
						<button type="button" className="btn btn-primary me-3" onClick={this.logout}>
							Cerrar Sesión
        				</button>
					</div>
				</div>
			</nav>
		)
	}
}

export default withRouter(NavbarCover);