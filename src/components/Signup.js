import React from 'react';
import { Navigate
 } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class SignupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', session_checked: null, pass: '', bdate: '', email: '',
                    resp: null, error: null, checking: null, already_logged_in: null, soc_auth_link: null,
                    mark_empty_name: null, mark_empty_pass: null, mark_empty_bdate: null, mark_empty_email: null,
                    bad_pass_message: null};

      this.handleChangeN = this.handleChangeN.bind(this);
      this.handleChangeP = this.handleChangeP.bind(this);
      this.handleChangeE = this.handleChangeE.bind(this);
      this.handleChangeD = this.handleChangeD.bind(this);

      this.checkIfPassOk = this.checkIfPassOk.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkIfPassOk(){
      let pass = this.state.pass
      let message = ""
      if (pass.length <12){
        message+="Password has to be at least 12 characters long!\n"
      }
      if (!(/[A-Z]/.test(pass))) {
        message+="Password has to contain at least one uppercase symbol!\n"
      }
      if (!(/[a-z]/.test(pass))) {
        message+="Password has to contain at least one lowercase symbol!\n"
      }
      if (!(/\d/.test(pass))) {
        message+="Password has to contain at least one number!\n"
      }
      if (!(/[!@#\$%\^\&*\)\(+=._-]/.test(pass))) {
        message+="Password has to contain at least one special character!\n"
      }
      if (pass.replace(/\D/g, '').length > parseInt(pass.length/2)){
        message+="Password should not be mostly numeric!\n"
      }
      this.setState({bad_pass_message:message})
    }

    componentWillMount() {
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
                  return
                }
              })
              .catch((err)=>console.log(err))
        }
      this.setState({session_checked: true})
    }

    handleChangeN(event) {
      this.setState({name: event.target.value});
    }
    handleChangeP(event) {
      this.setState({pass: event.target.value});
      this.checkIfPassOk()
    }
    handleChangeE(event) {
        this.setState({email: event.target.value});
    }
    handleChangeD(event) {
        this.setState({bdate: event.target.value});
    }
  
    handleSubmit(event) {
        this.setState({ checking: true });
        let found_empty = false
        let user = {
            username : this.state.name,
            password : this.state.pass,
            bdate : this.state.bdate,
            email : this.state.email,
            role : 'user',
        }
        for (let [key, value] of Object.entries(user)) {
          if (value === "" || value === null || value === undefined){
            found_empty = true
            switch (key){
              case "username":
                this.setState({mark_empty_name:true})
                break
              case "password":
                this.setState({mark_empty_pass:true})
                break
              case "bdate":
                this.setState({mark_empty_bdate:true})
                break
              case "email":
                this.setState({mark_empty_email:true})
                break
            }
          }
        }
        if (found_empty || this.state.bad_pass_message!=""){
          this.setState({ checking: false });
        }
        else{
          console.log(user)
            fetch(
            `https://api-gamersgazette.herokuapp.com/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: JSON.stringify(user)
                })
                .then((res) => {
                  if (res.status == 409){
                    this.setState({error: "The account with this data already exists, you need to sign in!", checking: false})
                    return
                  }
                  return res.json()
                })
                .then((json) =>{
                    console.log(json)
                    console.log("sucessfully signed up!")  
                    let d = new Date();
                    d.setTime(d.getTime() + (30*60000));
                    cookies.set(json.Name, json.Value, {expires: d, path: "/"});
                    this.setState({ resp: json });
                })
                .catch((err)=>{
                    console.log("Got error while signing up: "+err)
                    this.setState({ err });
                    })
                  }
            event.preventDefault();
        }

    render() {
      let { mark_empty_name, mark_empty_pass, mark_empty_email, mark_empty_bdate, resp, error, checking, already_logged_in, soc_auth_link, session_checked, bad_pass_message} = this.state
      return (
          <div>
          {error && <strong>{error}</strong>}
          {(resp || already_logged_in) && (
            <Navigate to="/articles" replace={true} />
          )}
          {soc_auth_link && (
            <Navigate to={soc_auth_link}/>
          )}
          {session_checked && (
          <form onSubmit={this.handleSubmit}>
            <label>
              <div style={{ color: mark_empty_name ? "red" : "black" }}>Name:</div>
              <input style={{ border: mark_empty_name ? "4px solid red" : "1px solid black" }}  type="text" value={this.state.name} onChange={this.handleChangeN} />
            </label>
            <br></br>
            <label>
              <div style={{ color: mark_empty_pass ? "red" : "black" }}>Password:</div>
              <input style={{ border: mark_empty_pass ? "4px solid red" : "1px solid black" }} type="password" value={this.state.pass} onChange={this.handleChangeP} />
              <div style={{color: "red"}}>bad_pass_message</div>
            </label>
            <label>
            <div style={{ color: mark_empty_email ? "red" : "black" }}>Email:</div>
              <input style={{ border: mark_empty_email ? "4px solid red" : "1px solid black" }} type="text" value={this.state.email} onChange={this.handleChangeE} />
            </label>
            <label>
              <div style={{ color: mark_empty_bdate ? "red" : "black" }}>Birthdate:</div>
              <input style={{ border: mark_empty_bdate ? "4px solid red" : "1px solid black" }} type="date" value={this.state.bdate} onChange={this.handleChangeD} />
            </label>
            {!checking && (
              <div>
                <a href = "https://oauth.vk.com/authorize?response_type=code&client_id=8134856&redirect_uri=https://gamersgazette.herokuapp.com/signup/vk&scope=account+email+bdate" target="_blank">Войти через ВК</a>
                <input type="submit" value="Submit" />
              </div>
            )}
          </form>
          )}
          </div>
        );
      }
    }

export default SignupForm;