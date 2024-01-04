import moment from 'moment';
import React, { Component } from 'react';


export default class NewCard extends Component {
    render() {
        const { news } = this.props;
      
        if (!news) {
            return null;
        }
        const date = moment(news.date, 'x').utc().format('DD/MM/YYYY hh:mm a')
        return (
            <a href={news.permanlink} target="_blank" rel="noreferrer" className="text-decoration-none text-dark" >
                <div className="card">
                    <div className="card-header">
                        <p className="m-0">{date}</p>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            {news.title}
                        </h5>
                        <p className="bg-info d-inline-block p-1 my-1 rounded-3">{news.category.name}</p>
                        <p className="card-text">{news.description}</p>
                        <button className="btn btn-success">Ver Noticia</button>
                    </div>
                </div>
            </a>
        )
    }
}
