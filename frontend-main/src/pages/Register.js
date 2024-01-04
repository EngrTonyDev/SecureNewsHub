import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Loading from '../components/Loading';
import { register } from '../services/AuthService';
import { getCountriesList } from '../services/CountryService';

class Register extends Component {

    state = {
        countries: [],
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        country: '',
        address1: '',
        address2: '',
        city: '',
        number: '',
        isLoading: false,
        alert: { show: false, msg: '', isError: false }
    }

    componentDidMount() {
        this.gettingCountries();
    }

    gettingCountries = async () => {
        this.setState({ isLoading: true });
        const { error, data } = await getCountriesList();
        if (!error) {
            this.setState({ countries: data })
        }
        this.setState({ isLoading: false });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleGoBack = () => {
        this.props.history.push('/');
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ alert: { show: false }, isLoading: true })
        const { address1, address2, city, country, email, first_name, last_name, number, password } = this.state;
        const data = {
            address1,
            address2,
            city,
            country,
            email,
            first_name,
            last_name,
            number,
            password
        }
        const { error, msg } = await register(data);
        if (!error) {
            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                country: '',
                address1: '',
                address2: '',
                city: '',
                number: '',
                alert: { show: true, isError: false, msg: msg },
                isLoading: false
            })
        } else {
            this.setState({ alert: { show: true, isError: true, msg: msg.message || msg }, isLoading: false })
        }
    }

    render() {
        const { address1, address2, city, countries, country, email, first_name, last_name, number, password, alert, isLoading } = this.state;

        return (
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Registro</h2>
                                        <p className="text-white-50 mb-5">Por favor todos sus datos</p>
                                        {
                                            isLoading ?
                                                <Loading />
                                                :
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="first_name" className="form-label">Nombre</label>
                                                                    <input required className="form-control" id="first_name" name="first_name" value={first_name} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="last_name" className="form-label">Apellido</label>
                                                                    <input required className="form-control" id="last_name" name="last_name" value={last_name} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="email" className="form-label">Email</label>
                                                                    <input required type="email" className="form-control" id="email" name="email" value={email} onChange={this.handleChange} placeholder="name@example.com" />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="password" className="form-label">Password</label>
                                                                    <input required type="password" className="form-control" id="password" name="password" value={password} onChange={this.handleChange} />
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label htmlFor="address1" className="form-label">Dirección</label>
                                                                    <input required className="form-control" id="address1" name="address1" value={address1} onChange={this.handleChange} />
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label htmlFor="address2" className="form-label">Dirección 2</label>
                                                                    <input required className="form-control" id="address2" name="address2" value={address2} onChange={this.handleChange} />
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label htmlFor="country" className="form-label">País</label>
                                                                    <select className="form-select" id="country" value={country} name="country" onChange={this.handleChange}>
                                                                        <option></option>
                                                                        {
                                                                            countries.map(country => <option key={country.alpha3Code} value={country.name}>{country.name}</option>)
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="city" className="form-label">Ciudad</label>
                                                                    <input required className="form-control" id="city" name="city" value={city} onChange={this.handleChange} />
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="number" className="form-label">Telefono</label>
                                                                    <input required className="form-control" id="number" name="number" value={number} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Registrar</button>

                                                                <button className="ms-3 btn btn-outline-info btn-lg px-5" onClick={this.handleGoBack}>Volver</button>
                                                            </div>
                                                            {
                                                                alert.show &&
                                                                <div className="col-12 mt-4">
                                                                    <div className={`alert alert-${alert.isError ? 'danger' : 'success'}`} role="alert">
                                                                        {alert.msg}
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </form>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Register);