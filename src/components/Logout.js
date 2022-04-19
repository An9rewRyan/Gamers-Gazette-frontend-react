import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Logout extends React.Component {

    constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout(this)
      this.state = {already_logged_in: null};
    }

    componentDidMount() {
      let session_cookie = cookies.get('session_token')
      console.log(session_cookie)
      if (session_cookie){
        fetch(
          `https://api-gamersgazette.herokuapp.com/auth/me`, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain'
            },
              body: JSON.stringify({session_cookie:session_cookie})
            })
              .then((res) =>{
                console.log(res.status)
                if (res.status != 400 && res.status != 401){
                  this.setState({already_logged_in: true})
                }
              })
              .catch((err)=>console.log(err))
        }
    }

    handleLogout() {
      let session_cookie = cookies.get('session_token')
      fetch(
        `https://api-gamersgazette.herokuapp.com/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
            body: JSON.stringify({session_cookie:session_cookie})
          })
          .then((res) =>{
            console.log(res.status)
            let d = new Date();
            d.setTime(d.getTime() - (30*60000));
            cookies.set('session_token', "", {expires: d})
            this.setState({already_logged_in: null})
          })
          .catch((err)=>console.log(err))
    }

    render() {
      let {already_logged_in} = this.state;
        return (
          <div>
          {already_logged_in 
            ? <button onClick={this.handleLogout}>Log out</button>
            : <div>Logged out!</div>
          }
          </div>
        );
      }
    }

export default Logout;