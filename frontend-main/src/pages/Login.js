import React, { Component } from "react";
import { Link } from "react-router-dom";

import VerifyPhoneCodeModal from "../components/VerifyPhoneCodeModal";

import { login2FA } from "../services/AuthService";

class Login extends Component {
	state = {
		email: "",
		password: "",
		error: { show: false, msg: '' },
		openModal: false
	};

	handleCloseModal = () => {
		this.setState({ openModal: false });
	}

	//Método para capturar la informacion de los inputs
	handleChangeInput = async (e) => {
		await this.setState({
			[e.target.name]: e.target.value
		});
	};

	//Método para petición http de iniciar sesión
	handleLogin = async (e) => {
		e.preventDefault();
		await this.setState({ error: { show: false, msg: '' } });

		const { email, password } = this.state;
		if (!email || email.trim() === '' || !password || password.trim() === '') {
			return;
		}
		const { error, msg } = await login2FA({ email, password });
		if (error) {
			this.setState({ error: { show: true, msg } });
			return;
		}

		this.setState({ openModal: true })
	};



	render() {
		return (
			<section className="vh-100 gradient-custom">
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5">
							<div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
								<div className="card-body p-5 text-center">
									<form className="form-group" onSubmit={(e) => this.handleLogin(e)}>
										<div className="mt-md-4 pb-5">

											<h2 className="fw-bold mb-2 text-uppercase">Inicio de sesión</h2>
											<p className="text-white-50 mb-5">Por favor ingrese su correo y contraseña</p>

											<div className="form-outline form-white mb-4">
												<input
													type="email"
													id="typeEmailX"
													className="form-control form-control-lg"
													name="email"
													required
													onChange={this.handleChangeInput}
													value={this.state.email} />
												<label className="form-label" htmlFor="typeEmailX">Correo</label>
											</div>

											<div className="form-outline form-white mb-4">
												<input
													type="password"
													id="typePasswordX"
													className="form-control form-control-lg"
													name="password"
													required
													value={this.state.password}
													onChange={this.handleChangeInput} />
												<label className="form-label" htmlFor="typePasswordX">Contraseña</label>
											</div>

											<button className="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>

											{
												this.state.error.show &&
												<div className="alert alert-danger my-3" role="alert">
													{this.state.error.msg}
												</div>
											}
										</div>

										<div>
											<p className="mb-0">¿No tienes una cuenta? <Link to="/register" className="text-white-50 fw-bold">Registrase</Link></p>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<VerifyPhoneCodeModal openModal={this.state.openModal} handleCloseModal={this.handleCloseModal} email={this.state.email} />
			</section>
		);
	}
}

export default Login;
