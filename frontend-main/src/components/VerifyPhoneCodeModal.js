import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react'
import { verifyPhoneCode } from '../services/AuthService';
import { withRouter } from 'react-router';


class VerifyPhoneCodeModal extends Component {

    state = {
        code: '',
        error: { show: false, msg: '' },
    }

    handleChangeInput = (e) => {
        this.setState({ code: e.target.value });
    }

    handleCloseModal = () => {
        this.props.handleCloseModal();
    }

    handleVerifyCode = async () => {
        await this.setState({ error: { show: false, msg: '' } });

        const { code } = this.state;
        if (!code || code.trim() === '') {
            return;
        }

        const { error, data, msg } = await verifyPhoneCode({
            email: this.props.email,
            phoneCode: code
        });

        if (error) {
            this.setState({ error: { show: true, msg } });
            return;
        }
        
        localStorage.setItem('token', data.token);
        // Redirigirlo al index
        this.props.history.replace('/index');
    }

    render() {
        return (
            <Modal isOpen={this.props.openModal}>
                <ModalHeader style={{ display: 'block' }}>
                    <span style={{ float: 'right' }} onClick={() => this.handleCloseModal()}>X</span>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="name">Ingrese su código</label>
                        <input className="form-control" onChange={this.handleChangeInput} value={this.state.code} />
                    </div>
                    {
                        this.state.error.show &&
                        <div class="alert alert-danger my-3" role="alert">
                            {this.state.error.msg}
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => this.handleVerifyCode()}>
                        Verificar
                    </button>
                    <button className="btn btn-danger" onClick={() => this.handleCloseModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default withRouter(VerifyPhoneCodeModal);