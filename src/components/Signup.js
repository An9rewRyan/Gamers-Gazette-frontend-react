import React from 'react';
import { Navigate
 } from 'react-router-dom';
import cookie from "react-cookie";

class SiginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', pass: '', bdate: '', email: '', resp: null, error: null, checking: null, already_logged_in: null, soc_auth_link: null};
      this.SignedUp = false

      this.handleChangeN = this.handleChangeN.bind(this);
      this.handleChangeP = this.handleChangeP.bind(this);
      this.handleChangeE = this.handleChangeE.bind(this);
      this.handleChangeD = this.handleChangeD.bind(this);
      // this.logInVk = this.logInVk.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
                if (res.status != '400' && res.status != 401){
                  this.setState({already_logged_in: true})
                }
              })
              .catch((err)=>console.log(err))
        }
    }

    handleChangeN(event) {
      this.setState({name: event.target.value});
    }
    handleChangeP(event) {
      this.setState({pass: event.target.value});
    }
    handleChangeE(event) {
        this.setState({email: event.target.value});
    }
    handleChangeD(event) {
        this.setState({bdate: event.target.value});
    }
  
    handleSubmit(event) {
        this.setState({ checking: true });
        let user = {
            username : this.state.name,
            password : this.state.pass,
            bdate : this.state.bdate,
            email : this.state.email,
            role : 'user',
        }
        fetch(
        `https://api-gamersgazette.herokuapp.com/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(user)
            })
            .then((res) => res.json())
            .then((json) =>{
                console.log(json)
                console.log("sucessfully signed up!")  
                let d = new Date();
                d.setTime(d.getTime() + (minutes*30));
                cookie.set(json.Name, json.Value, {expires: d});
                this.setState({ resp: json });
            })
            .catch((err)=>{
                console.log("Got error while signing up: "+err)
                this.setState({ err });
                })
        event.preventDefault();
        }
    render() {
      let { resp, error, checking, already_logged_in, soc_auth_link } = this.state;
        return (
          <div>
          {error && <p>{error.message}</p>}
          {(resp || already_logged_in) && (
            <Navigate to="/articles" replace={true} />
          )}
          {soc_auth_link && (
            <Navigate to={soc_auth_link}/>
          )}
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.name} onChange={this.handleChangeN} />
            </label>
            <br></br>
            <label>
              Password:
              <input type="password" value={this.state.pass} onChange={this.handleChangeP} />
            </label>
            <label>
              Email:
              <input type="text" value={this.state.email} onChange={this.handleChangeE} />
            </label>
            <label>
              Birthdate:
              <input type="date" value={this.state.bdate} onChange={this.handleChangeD} />
            </label>
            {!checking && (
              <div>
                {/* <button type="button" onClick={this.logInVk}>Войти на вк</button> */}
                <a href = "https://oauth.vk.com/authorize?response_type=code&client_id=8134856&redirect_uri=https://gamersgazette.herokuapp.com/signup/vk&scope=account+email+bdate" target="_blank">Войти через ВК</a>
                <input type="submit" value="Submit" />
              </div>
            )}
          </form>
          </div>
        );
      }
    }

export default SiginForm;