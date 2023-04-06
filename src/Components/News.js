import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import { PropTypes } from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general"
  }
  static PropsTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }
  CapFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.CapFirstLetter(this.props.category)} | NewsToday`;
  }
  async updateNews() {
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9507bd96743446e9adf6cde86dc47302&page=${this.state.page}&pagesize=8`;
    this.setState({ loading: true })
    this.props.setProgress(30)
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }



  async componentDidMount() {
    this.setState({page:2})
    this.updateNews()
  }
  // handleNext = async () => {

  //   this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.updateNews()
  // }

  // handlePrevious = async () => {

  //   this.state({
  //     page: this.state.page - 1
  //   })
  //   this.updateNews()
  // }
  fetchMoreData = async () => { //Asyc is always written outside the function
    this.setState({ page: this.state.page+1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9507bd96743446e9adf6cde86dc47302&page=${this.state.page}&pagesize=8`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),//This will concatenate the the articles and add more in the bottom
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  render() {
    return (
      <>
        <h2 className='text-center' style={{ margin: "35px 0px" }}>NewsToday - Top Headlines from {this.CapFirstLetter(this.props.category)}</h2>
        {this.state.loading&&<Spinner/>}
        {/* This loader is while initialinzing the news content */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          // this loader is shown at the end of the news item while refreshing
        >
          <div className='container'>
            <div className='row' style={{ margin: "auto" }}>

              {this.state.articles.map((element) => {
                return <div className='col-md-3' key={element.url}>
                  <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.handlePrevious}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 8)} type="button" className="btn btn-secondary" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}







      </>
    )
  }
}

export default News
