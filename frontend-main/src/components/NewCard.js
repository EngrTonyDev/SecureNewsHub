import moment from 'moment';
import React, { Component } from 'react';


export default class NewCard extends Component {
    render() {
        const { notice } = this.props;
        const date = moment(notice.date, 'x').utc().format('DD/MM/YYYY hh:mm a')
        return (
            <a href={notice.permalink} target="_blank" rel="noreferrer" className="text-decoration-none text-dark" >
                <div className="card">
                    <div className="card-header">
                        <p className="m-0">{date}</p>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            {notice.title}
                        </h5>
                        <p className="bg-info d-inline-block p-1 my-1 rounded-3">{notice.category.name}</p>
                        <p className="card-text">{notice.description}</p>
                        <button className="btn btn-success">Ver Noticia</button>
                    </div>
                </div>
            </a>
        )
    }
}
