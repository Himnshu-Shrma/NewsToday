import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import { PropTypes } from 'prop-types';
export class News extends Component {
  static defaultProps={
     country:"in",
     category:"general"
  }
  static PropsTypes={
    country:PropTypes.string,
    category:PropTypes.string
  }
  constructor(){
    super();
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9507bd96743446e9adf6cde86dc47302&page=1&pagesize=8`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
    console.log(parsedData)
    

  }
  handleNext=async()=>{
    if(this.state.page+1 >Math.ceil(this.state.totalResults/8)){}
    else{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9507bd96743446e9adf6cde86dc47302&page=${this.state.page+1}&pagesize=8`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      page: this.state.page+1,
      articles:parsedData.articles,
      loading: false
    })
  }
}
  handlePrevious=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9507bd96743446e9adf6cde86dc47302&page=${this.state.page-1}&pagesize=8`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.state({
      page: this.state.page-1,
      articles:parsedData.articles,
      loading: false
    })
  }
  render() {
    return (
      <div >
      <h2 className='text-center' style={{margin:"35px 0px"}}>NewsToday - Top Headlines</h2>
      {this.state.loading&&<Spinner/>}
      <div className='row -md-3'>
        
    {!this.state.loading && this.state.articles.map((element)=>{
        return <div className='col-md-3' key={element.url}>
        <NewsItem  title={element.title} description={element.description} urlToImage={element.urlToImage}  newsUrl={element.url} />
        </div>
  })}
        
        
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handlePrevious}>&larr; Previous</button>
        <button disabled={this.state.page+1 >Math.ceil(this.state.totalResults/8)} type="button" className="btn btn-secondary" onClick={this.handleNext}>Next &rarr;</button>
        </div>
        
      

      </div>
        
        
      </div>

    )
  }
}

export default News
