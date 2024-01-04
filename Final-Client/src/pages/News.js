
import { getSession } from '../services/sessionService';
import React, { Component, useState } from 'react';
import { getCategories } from '../services/categoryService';
import { createSource, getSources, deleteSource, updateSource } from '../services/newSourceService';
import { getNewsByCategory, getNewsByUser } from '../services/newsService';
import './modal.css';
import { getRole } from '../services/roleService';
import { decodeToken } from '../utils/decodeToken';


class News extends React.Component {
    state = {
        data: [],
       
        form: {
            title: "",
            description: "",
            permanlink: "",
            category_id: "",
            sources_id: "",
            user_id: "",
            modalType: "",
        },
        categories: [],
        sources: [],
    };
    componentDidMount() {
       
        this.gettingNews();
        this.gettingCategories();
        this.gettingSession();

    }

    gettingSession = async () => {
        try{const user = await decodeToken();
            if(user===null){window.location.href = "/";//return to login screen
                
        }
        }catch{
            window.location.href = "/";//return to login screen

        }

    }
    
    



    gettingCategories = async () => {
        this.setState({ isLoading: true });
        const { data, error } = await getCategories();
        if (!error) {


            this.setState({ categories: data })
        }
        this.setState({ isLoading: false });
    }

    gettingSources = async () => {
        this.setState({ isLoading: true });
        const { error, data } = await getSources()

        if (data) {
            this.setState({ data: data })
        }
        this.setState({ isLoading: false });
    }


    gettingNews = async () => {
        this.setState({ isLoading: true });
        const { error, data } = await getNewsByUser(decodeToken()._id);//send user_id by parameter

        if (data) {
            
            this.setState({ data: data })
        }else{
          
        }
        this.setState({ isLoading: false });
    }

    selectCategories = async (e) => {
        e.persist();
        const id = e.target.value;
        await this.getSources(id)
    };

    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };


    handleChange2 = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                id_sources: e.target.value,
            },
        });
        console.log(this.state.form);
    };


    postNews = async () => {
        if (this.state?.form !== null && this.state?.form?.category !== 0) {
            await this.setState({
                form: {
                    ...this.state.form,
                    // user_id: from local storage token,
                },
            });
            console.log(this.state.form);

        } else {
            alert("No ha seleccionado la categoria...");
        }
    };








    render() {
        const { form } = this.state;
        //const form = this.state.form;
        return (
            <div className="App container mx-auto centar">
                <div className="content-between bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                    <div style={{ display: "block" }}>
                        <button className='border border-gray-400  px-4 py-2 text-center' style={{ float: "right" }} onClick={() => window.location.assign("/")}>
                            Log out
                        </button>
                    </div>
                    <div style={{ display: "block" }}>
                        <button className='border border-gray-400  px-4 py-2 text-center' style={{ float: "right" }} onClick={() => window.location.assign("/sources")}>
                            New Sources
                        </button>
                    </div>
                    <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center">
                        <h3 className="text-gray-500 mt-4 text-5xl font-semibold text-center">Dashboard</h3>


                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>Título de noticia</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((sources) => {
                                    return (
                                        <tr>
                                            <td>{sources.title}</td>
                                            <td>{sources.description}</td>
                                            <td>{sources.date}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        this.selectCategories(sources);
                                                        //this.addModal();
                                                    }}
                                                >

                                                </button>
                                                {"              "}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        this.selectCategories(sources);
                                                        //this.setState({ modalDelate: true });
                                                    }}
                                                >

                                                </button>{" "}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div id='modal'>


                            <div className="form-group">
                                <label htmlFor="name">Título</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    id="title"
                                    onChange={this.handleChange}
                                    value={form ? form.name : ""}
                                />
                                <br />
                                <label htmlFor="description">Descripción</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    id="description"
                                    onChange={this.handleChange}
                                    value={form ? form.description : ""}
                                />
                                <br />
                                <label htmlFor="link">Link</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="link"
                                    id="link"
                                    onChange={this.handleChange}
                                    value={form ? form.permanlink : ""}
                                />
                                <br />
                                <label htmlFor="category">Categoría</label>
                                <select
                                    value={this.state.category_id}
                                    onChange={this.selectCategories}
                                //Value={form ? form.category_id : ""}
                                >
                                    <option key={0} value={0}>
                                        Seleccione una opción
                                    </option>
                                    {this.state.categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <br />
                                <label htmlFor="sources">Recurso</label>
                                <select
                                    value={this.state.sources_id}
                                    onChange={this.handleChange2}
                                //Value={form ? form.category_id : ""}
                                ><option key={0} value={0}>
                                        Seleccione una opción
                                    </option>
                                    {this.state.sources?.map((sources) => (
                                        <option key={sources._id} value={sources._id}>
                                            {sources.name}
                                        </option>
                                    ))}
                                </select>
                                <br />
                            </div>



                        </div>

                    </div></div>
            </div>
        );
    }
}




export default News;

