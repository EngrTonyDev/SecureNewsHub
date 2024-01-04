import React, { Component } from 'react';
import "../css/NewUsers.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { decodeToken } from '../utils/decodeToken';

const url = "http://localhost:3000/api/users";




class NewsUsers extends Component {
  state = {
    data: [],
    //addModal: false,
    //modalDelate: false,
    form: {
      //id:'',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      address1: '',
      address2: '',
      country: '',
      city: '',
      number: '',
      rol:''
      //modalType: ''
    }
  }

  componentDidMount() {
        
  
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

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }

  postUser = async () => {
    await axios.post(url, this.state.form).then(response => {
        this.addModal();
    }).catch(error => {
        console.log(error.message);
    })
}



  addModal = () => {
    this.setState({ addModal: !this.state.addModal });
  }


  render() {
    const { form } = this.state;
    return (
      <div className="conteinerPrincipal">
        <div className="conteinerSecundario">
          <h2>Presione el siguiente botón para crear su usuario</h2>
          <button className="btn btn-success" onClick={() => this.addModal() }>Registrarme</button>
        </div>


        <Modal isOpen={this.state.addModal}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.addModal()}>X</span>
          </ModalHeader>

          <ModalBody>
            <div className="from-group">
              <div className="container px-4">
                <div className="row gx-5">

                  <div className="col">
                    <div className="p-2">
                    <label htmlFor="first_name">Nombre:</label>
                      <input type="text" className="form-control input-lg" name="first_name" id="first_name" placeholder="Nombre" onChange={this.handleChange} value={form ? form.first_name : ''}></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="p-2">
                    <label htmlFor="last_name">Apellido</label>
                      <input type="text" className="form-control input-lg" name="last_name" id="last_name" placeholder="Apellido" onChange={this.handleChange} value={form ? form.last_name : ''}></input>
                    </div>
                  </div>
                </div>
                <div className="row gx-5">
                  <div className="col">
                    <div className="p-2">
                    <label htmlFor="email">Email</label>
                      <input type="email" className="form-control input-lg" name="email" id="email" placeholder="Email" onChange={this.handleChange} value={form ? form.email : ''}></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="p-2">
                    <label htmlFor="password">Contraseña</label>
                      <input type="password" className="form-control input-lg" name="password" id="password" placeholder="Contraseña" onChange={this.handleChange} value={form ? form.password : ''}></input>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="p-2">
                  <label htmlFor="address1">Dirección 1</label>
                    <input type="text" className="form-control input-lg" name="address1" id="address1" placeholder="Dirección 1" onChange={this.handleChange} value={form ? form.address1 : ''}></input>
                  </div>
                </div>
                <div className="col">
                  <div className="p-2">
                  <label htmlFor="address2">Dirección 2</label>
                    <input type="text" className="form-control input-lg" name="address2" id="address2" placeholder="Dirección 2" onChange={this.handleChange} value={form ? form.address2 : ''}></input>
                  </div>
                </div>
                <div className="row gx-5">
                  <div className="col">
                    <div className="p-2">
                    <label htmlFor="country">País</label>
                      <input type="text" className="form-control input-lg" name="country" id="country" placeholder="País" onChange={this.handleChange} value={form ? form.country : ''}></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="p-2">
                    <label htmlFor="city">Ciudad</label>
                      <input type="text" className="form-control input-lg" name="city" id="city" placeholder="Ciudad" onChange={this.handleChange} value={form ? form.city : ''}></input>
                    </div>
                  </div>
                </div>
                <div className="row gx-5">

                  <div className="col">
                    <div className="p-2">
                    <label htmlFor="number">Número</label>
                      <input type="text" className="form-control input-lg" name="number" id="number" placeholder="Teléfono" onChange={this.handleChange} value={form ? form.number : ''}></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ModalFooter>
                <button className="btn btn-success" onClick={() => this.postUser()}>
                  Registrarme
                </button>

              <button className="btn btn-danger" onClick={() => this.addModal()}>Cancelar</button>
            </ModalFooter>

          </ModalBody>
        </Modal>
        <div className="conteinerSecundario">
          <span>Tiene usuario? </span>
          <a href="../">Ingresar</a>
        </div>

      </div>

    )
  }
}

export default NewsUsers;