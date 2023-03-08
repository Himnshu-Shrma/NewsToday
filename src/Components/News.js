import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    this.state={
      articles:[],
      loading:false
    }
  }
  async componentDidMount(){
    let url="https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=9507bd96743446e9adf6cde86dc47302";
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles})
    console.log(parsedData)
    

  }
  render() {
    return (
      <div className='Container my-4'>This is News Component
      <h2>NewsToday - Top Headlines</h2>
      
      <div className='row'>
        
    {this.state.articles.map((element)=>{
        return <div className='col-md-4' key={element.url}>
        <NewsItem  title={element.title} description={element.description} urlToImage={element.urlToImage}  newsUrl={element.url} />
        </div>
  })}
        
        
        <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-secondary">Previous</button>
        <button type="button" class="btn btn-secondary">Next</button>
        </div>
        
      

      </div>
        
        
      </div>

    )
  }
}

export default News