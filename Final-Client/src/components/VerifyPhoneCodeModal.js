import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react'
import { verifyPhoneCode } from '../services/authService';
//import { useHistory } from 'react-router-dom';


class VerifyPhoneCodeModal extends Component {

    state = {
        form: {
            email: '',
            phoneCode: '',


        },

        error: { show: false, msg: '' },
    }



    handleCloseModal = () => {
        this.props.handleCloseModal();
    }

    handleVerifyCode = async () => {

        this.state.form.email = document.getElementById("email").value;
        this.state.form.phoneCode = document.getElementById("code").value;

        if (this.state.form.phoneCode !== '') {

            const form = await verifyPhoneCode(this.state.form);

            if (!form.error) {
                console.log("form.data.token");
                console.log(form.data.token);
                localStorage.setItem('token', form.data.token);
                // Redirigirlo al index
                window.location.href = "/index";//return index website
                //history.push('/news');

            } else {
                alert("El código ingresado en incorrecto, vuelve a intentarlo.")
            }
        } else {
            alert("Debe ingresar un valor!")
        }



    }

    render() {
        return (
            <Modal isOpen={this.props.openModal}>

                <ModalHeader style={{ display: 'block' }}>
                    <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.handleCloseModal()}>
                        &times;
                    </span>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="name">Ingrese su código</label>
                        <input className="form-control" id="code" />
                    </div>
                    {this.state.error.show && (
                        <div className="alert alert-danger my-3" role="alert">
                            {this.state.error.msg}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => this.handleVerifyCode()}>
                        Verificar
                    </button>
                    <button className="btn btn-danger" onClick={() => this.handleCloseModal()}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default VerifyPhoneCodeModal;
