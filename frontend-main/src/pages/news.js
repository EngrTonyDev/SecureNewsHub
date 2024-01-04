import React, { Component } from "react";
//import logo from './logo.svg';
import "../css/CRUDCategories.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://localhost:3000/api/sources/";
const url2 = "http://localhost:3000/api/categories/";
const url3 = "http://localhost:3000/api/notices/";
// const cookies = new Cookies();

class Sources extends Component {
  state = {
    data: [],
    addModal: false,
    modalDelate: false,

    form: {
      title: "",
      description: "",
      link: "",
      id_category:"",
      id_sources:"",
      id_user: "",
      modalType: "",
    },
    categories: [],
    sources: [],
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

  getCategories = () => {
    axios
      .get(url2)
      .then((response) => {
        this.setState({ sources: this.state.sources, form:this.state.form, categories: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  getSources = async (id) => {
    await axios.get(`${url}${id}`).then(response => {
      this.setState({ sources: response.data, form: {...this.state.form, id_category: id}, categroies: this.state.categories });
      console.log(response);
    }).catch(error => {
      console.log(error.message);
    })
  }

  getNews = async() => {
    // await axios.get(`${url3}${cookies.get("id")}`).then(response => {
    //     this.setState({ data: response.data });
    // }).catch(error => {
    //     console.log(error.message);
    // })
}

  selectCateories = async (e) => {
    e.persist();
    const id = e.target.value;
    await this.getSources(id)
  };


  //selectCateories = (sources) => {
  //   this.setState({
  //     modalType: "update",
  //     form: {
  //       id: sources._id,
  //       name: sources.name,
  //       category: sources.category.name,
  //     },
  //   });
  // };

  postNews = async () => {
    if (this.state?.form !== null && this.state?.form?.category !== 0) {
      await this.setState({
        form: {
          ...this.state.form,
          // id_user: cookies.get("id"),
        },
      });
      console.log(this.state.form);
      await axios
        .post(url3, this.state.form)
        .then((response) => {
          this.addModal();
          this.getNews();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert("No ha seleccionado la categoria...");
    }
  };

  putNews = () => {
    axios
      .put(url + "?id=" + this.state.form.id, this.state.form)
      .then((response) => {
        this.addModal();
        this.getNews();
      });
  };

  delateSources = () => {
    axios.delete(url + "?id=" + this.state.form.id).then((response) => {
      this.setState({ modalDelate: false });
      this.getNews();
    });
  };

  addModal = () => {
    this.setState({ addModal: !this.state.addModal });
  };


  componentDidMount() {
    this.getNews();
    this.getCategories();
  }

  render() {
    const { form } = this.state;
    //const form = this.state.form;
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, modalType: "add" });
            this.addModal();
          }}
        >
          Agregar Categoría
        </button>
        <br />
        <br />
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
                        this.selectCateories(sources);
                        this.addModal();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {"              "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.selectCateories(sources);
                        this.setState({ modalDelate: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.addModal}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "right" }} onClick={() => this.addModal()}>
              X
            </span>
          </ModalHeader>
          <ModalBody>
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
                value={form ? form.link : ""}
              />
              <br />
              <label htmlFor="category">Categoría</label>
              <select
                value={this.state.category_id}
                onChange={this.selectCateories}
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
                value={this.state.sources_id }
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
          </ModalBody>

          <ModalFooter>
            {this.state.modalType === "add" ? (
              <button
                className="btn btn-success"
                onClick={() => this.postNews()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.putNews()}
              >
                Actualizar
              </button>
            )}
            <button className="btn btn-danger" onClick={() => this.addModal()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDelate}>
          <ModalBody>
            Estás seguro que deseas eliminar a la la categoría
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.delateSources()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalDelate: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Sources;
