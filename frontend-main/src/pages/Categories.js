import React, { Component } from 'react';
import NavbarCover from '../comun/navbar';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../services/CategoryService';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';


class Categories extends Component {

    state = {
        data: [],
        addEditModal: false,
        modalDelate: false,
        isLoading: false,
        categorySelected: null,
        form: {
            name: ''
        }
    }

    componentDidMount() {
        this.gettingCategories();
    }

    gettingCategories = async () => {
        this.setState({ isLoading: true });
        const { data, error } = await getCategories();
        if (!error) {
            this.setState({ data })
        }
        this.setState({ isLoading: false });
    }

    handleCloseAddEditModal = () => {
        this.setState({ addEditModal: false, categorySelected: null, form: { name: '' } });
    }

    handleOpenAddEditModal = (category) => {
        if (category) {
            this.setState({ addEditModal: true, categorySelected: category, form: category });
        } else {
            this.setState({ addEditModal: true, categorySelected: null });
        }
    }

    handleOpenDelete = (category) => {
        this.setState({ modalDelate: true, categorySelected: category });
    }

    handleCloseDelete = () => {
        this.setState({ modalDelate: false, categorySelected: null });
    }

    handleDelete = async () => {
        this.setState({ isLoading: true });
        const { error } = await deleteCategory(this.state.categorySelected);
        if (!error) {
            await this.gettingCategories();
            this.handleCloseDelete();
        }
        this.setState({ isLoading: false });
    }

    handleChange = (e) => {
        this.setState({ form: { ...this.state.form, name: e.target.value,  } })
    }

    postCategories = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        const { error } = await createCategory(this.state.form);

        if (!error) {
            await this.gettingCategories();
            this.handleCloseAddEditModal();
        }
        this.setState({ isLoading: false });
    }

    putCategories = async (e) => {
        e.preventDefault();
        const { error } = await updateCategory(this.state.form);
        if (!error) {
            await this.gettingCategories();
            this.handleCloseAddEditModal();
        }
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading, categorySelected, form } = this.state; 

        return (
            <div className="App">
                <NavbarCover />

                <button className="btn btn-success my-5" onClick={() => this.handleOpenAddEditModal()}>Agregar Categoría</button>

                {
                    isLoading ?
                        <Loading />
                        :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(category => {
                                    return (
                                        <tr key={category._id}>
                                            <td>{category.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => this.handleOpenAddEditModal(category)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>

                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => this.handleOpenDelete(category)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                }


                <Modal isOpen={this.state.addEditModal}>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                className="form-control"
                                name="name"
                                id="name"
                                required
                                onChange={this.handleChange}
                                value={form.name}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={this.handleCloseAddEditModal}>Cancelar</button>
                        <button
                            className={`btn btn-${categorySelected ? 'info' : 'success'} ms-3`}
                            onClick={categorySelected ? this.putCategories : this.postCategories}
                        >
                            {categorySelected ? 'Actualizar' : 'Insertar'}
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelate}>
                    <ModalBody>
                        Estás seguro que deseas eliminar a la la categoría?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Sí</button>
                        <button className="btn btn-secondary" onClick={this.handleCloseDelete}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Categories;