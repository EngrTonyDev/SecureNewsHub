import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import NavbarCover from '../comun/navbar';
import { getCategories } from '../services/CategoryService';
import { createSource, deleteSource, getSources, updateSource } from '../services/SourceService';
import { decodeToken } from '../utils/auth';
import Loading from '../components/Loading';

class Sources extends Component {

	state = {
		categories: [],
		data: [],
		addEditModal: false,
		modalDelate: false,
		isLoading: false,
		sourceSelected: null,
		form: {
			name: '',
			url: '',
			category_id: '',
			user_id: ''
		}
	}

	componentDidMount() {
		this.gettingCategories();
		this.gettingSources();
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
		const { data, error } = await getSources();
		if (!error) {
			this.setState({ data })
		}
		this.setState({ isLoading: false });
	}

	handleCloseAddEditModal = () => {
		this.setState({
			addEditModal: false, sourceSelected: null,
			form: {
				name: '',
				url: '',
				category_id: '',
				user_id: ''
			}
		});
	}

	handleOpenAddEditModal = (source) => {
		if (source) {
			this.setState({ addEditModal: true, sourceSelected: source, form: { ...source, category_id: source.category._id, user_id: source.user._id } });
		} else {
			this.setState({ addEditModal: true, sourceSelected: null });
		}
	}

	handleOpenDelete = (source) => {
		this.setState({ modalDelate: true, sourceSelected: source });
	}

	handleCloseDelete = () => {
		this.setState({ modalDelate: false, sourceSelected: null });
	}

	handleDelete = async () => {
		this.setState({ isLoading: true });
		const { error } = await deleteSource(this.state.sourceSelected);
		if (!error) {
			await this.gettingSources();
			this.handleCloseDelete();
		}
		this.setState({ isLoading: false });
	}

	handleChange = (e) => {
		this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value, } })
	}

	postSource = async (e) => {
		e.preventDefault();
		this.setState({ isLoading: true });
		const user = decodeToken();
		const { error } = await createSource({ ...this.state.form, user_id: user._id });
		if (!error) {
			await this.gettingSources();
			this.handleCloseAddEditModal();
		}
		this.setState({ isLoading: false });
	}

	putSource = async (e) => {
		e.preventDefault();
		const { error } = await updateSource(this.state.form);
		if (!error) {
			await this.gettingSources();
			this.handleCloseAddEditModal();
		}
		this.setState({ isLoading: false });
	}

	render() {
		const { isLoading, sourceSelected, form, categories } = this.state;

		return (
			<div className="App">
				<NavbarCover />
				<button className="btn btn-success my-5" onClick={() => this.handleOpenAddEditModal()}>Agregar Recurso</button>

				{
					isLoading ?
						<Loading />
						:
						<table className="table ">
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Categoría</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{this.state.data.map((source) => {
									return (
										<tr key={source._id}>
											<td>{source.name}</td>
											<td>{source.category.name}</td>
											<td>
												<button
													className="btn btn-primary"
													onClick={() => this.handleOpenAddEditModal(source)}
												>
													<FontAwesomeIcon icon={faEdit} />
												</button>

												<button
													className="btn btn-danger ms-2"
													onClick={() => this.handleOpenDelete(source)}
												>
													<FontAwesomeIcon icon={faTrashAlt} />
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
				}
				<Modal isOpen={this.state.addEditModal}>
					<ModalBody>
						<div className="form-group">
							<label htmlFor="name">Nombre</label>
							<input className="form-control" name="name" id="name" onChange={this.handleChange} value={form.name} />
						</div>
						<div className="form-group">
							<label htmlFor="url">URL</label>
							<input className="form-control" name="url" id="url" onChange={this.handleChange} value={form.url} />
						</div>
						<div className="form-group">
							<label htmlFor="category_id">Categoría</label>
							<select value={form.category_id} onChange={this.handleChange} name="category_id" className="form-control">
								<option value="">Ninguna</option>
								{
									categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
								}
							</select>
						</div>
					</ModalBody>

					<ModalFooter>
						<button className="btn btn-danger" onClick={this.handleCloseAddEditModal}>Cancelar</button>
						<button
							className={`btn btn-${sourceSelected ? 'info' : 'success'} ms-3`}
							onClick={sourceSelected ? this.putSource : this.postSource}
						>
							{sourceSelected ? 'Actualizar' : 'Insertar'}
						</button>
					</ModalFooter>
				</Modal>


				<Modal isOpen={this.state.modalDelate}>
					<ModalBody>
						Estás seguro que deseas eliminar el recurso?
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
export default Sources;