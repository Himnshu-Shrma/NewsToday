import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, urlToImage, newsUrl, author, date ,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={urlToImage ? urlToImage : "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"} className="card-img-top" alt="..." />
          <div className="card-body">
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left:"90%",zIndex:"1"}}>
              {source}
              <span class="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}..</p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className=" btn btn sm btn btn-secondary">Full Article</a>
            <p className="card-text"><small className="text-muted">{author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem