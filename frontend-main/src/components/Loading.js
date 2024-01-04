import React, { Component } from 'react'

class Loading extends Component {
    render() {
        return (
            <div className="d-flex align-items-center">
                <span className="spinner-border spinner-border me-3 text-warning" role="status" aria-hidden="true"></span>
                <h5>Cargando...</h5>
            </div>
        )
    }
}

export default Loading;