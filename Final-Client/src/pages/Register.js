import React, { Component } from 'react'
import { getCountriesList } from '../services/CountryService';
import { createUser } from '../services/userService';
import { Navigate  } from 'react-router';
import { register } from '../services/authService';


class Register extends Component {

    state = {
        countries: [],
        form:{
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            country: '',
            address: '',
            city: '',
            zip_code: '',
            number:'',
            role_id:'64193d458e0f2d002b694e33',//role id for regular

        }
       
       
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

    postUser = async(e) => {
        e.preventDefault()
    
        this.setState({ isLoading: true });
        
        this.state.form.first_name = e.target.first_name.value;
        this.state.form.last_name = e.target.last_name.value;
        this.state.form.email = e.target.email.value;
        this.state.form.password = e.target.password.value;
        this.state.form.country = e.target.country.value;
        this.state.form.address = e.target.address.value;
        this.state.form.city = e.target.city.value;
        this.state.form.zip_code = e.target.zip_code.value;
        this.state.form.number = e.target.number.value;

        console.log("this.state.form");
        console.log(this.state.form);

        //const form = await createUser(this.state.form);
        const form = await register(this.state.form);
        console.log(form.data);
        if (!form.error) {
            
            
            alert("Se ha enviado un correo para la verificación de la cuenta.");
            window.location.href = "/";//return to login screen
        }
       
    
        //verifyRegister(Email, Password)
    }



    render() {
        const { countries } = this.state;
        return (
            <div className="container mx-auto centar">
                <div className="flex justify-center px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={this.postUser} method="POST">
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            First Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            Last Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Address"
                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            Country
                                        </label>
                                        <div>
                                            <select className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                                //value='{form.category_id}' 
                                                //onChange={this.handleChange} 
                                                name="country"
                                                id="country">
                                                <option key="none" value="">Ninguna</option>
                                                {
                                                    countries.map(country => <option key={country._id} value={country._id}>{country.name}</option>)
                                                }

                                            </select>
                                        </div>
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            City
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="City"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            Zip Code
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="zip_code"
                                            name="zip_code"
                                            type="text"
                                            placeholder="Zip Code"
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="number"
                                            name="number"
                                            type="text"
                                            placeholder="Number"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-violet-500 rounded-full hover:bg-violet-600 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Register Account
                                    </button>
                                </div>
                                </form>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-violet-500 align-baseline hover:text-violet-600"
                                        href="/"
                                    >
                                        Already have an account? Login!
                                    </a>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;