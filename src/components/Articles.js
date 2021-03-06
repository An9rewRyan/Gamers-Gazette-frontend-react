import '../styles/App.css';
import React from 'react';

class Articles extends React.Component {
   
  constructor(props) {
      super(props);
 
      this.state = {
          items: [],
          DataisLoaded: false
      };
  }
  componentDidMount() {
      fetch(
`https://api-gamersgazette.herokuapp.com/api/v1/articles/`)
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
          })
          .catch((err)=>console.log(err))
  }
  render() {
      const { items } = this.state;
      if (items != null){
      return (
      <div className = "App">
          <h1> Fetch data from an api in react </h1>  {
              items.map((item) => ( 
            <div class = "details_content">
            <div class = "post">
              <ol key = { item.article_id } >
              <h2 class = "post_title">{ item.title }</h2>
              <div> {item.site_alias} </div>
              <div class = "date_time"> { item.pub_date }</div>
              <div>Image url: {item.image_url}</div>
              <div><br></br>{ item.content }<a href={item.src_link}>Source link</a></div>
              <br></br>
                </ol>
            </div>
            </div>
              ))
          }
      </div>
      )}
      else{
        return (
            <div className = "App">
                <h1>Database is empty!</h1>
            </div>
        )}
    }
}

export default Articles;
