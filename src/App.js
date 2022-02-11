import './App.css';
import {useEffect,useState} from 'react';

function App() {

  let searchdata="today";
  let[articles,setArticles]=useState([]);

  function readValue(value){
    searchdata=value;
  }
  useEffect(()=>{
    getNews();
  },[])
  function getNews(){
    fetch(`https://newsapi.org/v2/everything?q=${searchdata}&apiKey=e7792f17d048401c813b04cf1d09bae7`)
    .then((response)=>response.json())
    .then((news)=>{
      setArticles(news.articles);
    })
    .catch((err)=>{
      console.log(err);
    })
  } 


  return (
    <div className="App">
      <div className="search">
        <input placeholder='Search' className="search-news" onChange={(event)=>{readValue(event.target.value)}}/>
        <button className="search-btn"onClick={getNews}>Search</button>
      </div>
      <div className="articles">
        {
          articles?.map((article,index)=>{
            return(
              <div className="article" key={index}>
                <img className="news-img" src={article.urlToImage}/>
                <div className="news-details">
                  <h3 className="title">{article.title}</h3>
                  <h4 className="author">{article.author}</h4>
                  <h4 className="author">Published At: {article.publishedAt}</h4>
                  <a href={article.url} target="_blank">
                    <button className="btn">Read more</button>
                  </a>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
