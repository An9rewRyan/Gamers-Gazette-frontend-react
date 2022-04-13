import '../styles/styles.scss';
import React from 'react';

class ArticlesApp extends React.Component {
   
  constructor(props) {
      super(props);
 
      this.state = {
          items: [],
          DataisLoaded: false
      };
  }

  componentDidMount() {
      fetch(
`https://gamersgazette.herokuapp.com/api/v1/articles/`)
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
          })
  }
  render() {
      const { DataisLoaded, items } = this.state;
      if (!DataisLoaded) return <div>
          <h1> Pleses wait some time.... </h1> </div> ;
      if (items != null){
      return (
      <div className = "App">
          <h1> Fetch data from an api in react </h1>  {
              items.map((item) => ( 
            <div key = { item.article_id } className = "details_content">
                <div className = "post">
                    <h2 className = "post_title">{ item.title }</h2>
                    <div> {item.site_alias} </div>
                    <div className = "date_time"> { item.pub_date }</div>
                    <div>Image url: {item.image_url}</div>
                    <div><br></br>{ item.content }<a href={item.src_link}>Source link</a></div>
                    <br></br>
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

export default ArticlesApp;