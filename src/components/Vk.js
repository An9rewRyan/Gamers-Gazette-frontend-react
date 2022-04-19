// import React from 'react';
// import { Navigate
//  } from 'react-router-dom';
//  import cookie from "react-cookie";
 
// class VkForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {name: null, email:null, email_is_empty: true, bdate:null, pass:null, checking: null, already_logged_in: null};
//       this.SignedUp = false

//       this.handleChangeP = this.handleChangeP.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//       this.handleChangeE = this.handleChangeE.bind(this);
//     }

//     static propTypes = {
//       cookies: instanceOf(Cookies).isRequired
//     };

//     componentDidMount() {
//       const { cookies } = this.props;
//       let link = `https://api-gamersgazette.herokuapp.com/socialauth/vk/me`
//       let session_cookie = cookies.get('session_token')
//       console.log(session_cookie)
//       if (session_cookie){
//         fetch(
//           `https://api-gamersgazette.herokuapp.com/auth/me`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'text/plain'
//             },
//               body: JSON.stringify({session_cookie:session_cookie})
//             })
//               .then((res) =>{
//                 console.log(res.status)
//                 if (res.status != '400' && res.status != 401){
//                   this.setState({already_logged_in: true})
//                 }
//               })
//               .catch((err)=>console.log(err))
//         }
//         if (!this.state.already_logged_in){
//             fetch(
//                link, {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'text/plain'
//                   },
//                     body: JSON.stringify({url_with_code:window.location.href})
//                   })
//                   .then((res) => res.json())
//                   .then((json) =>{
//                       console.log(json)
//                       if (json.email != ""){
//                         this.setState({email_is_empty: false})
//                       }
//                       this.setState({ name: json.username, email: json.email, bdate: json.birthdate });
//                   })
//                   .catch((err)=>{
//                       console.log("Got error while logging in by vk: "+err)
//                       this.setState({ err });
//                       })
//                     }
//                 }

//     handleChangeP(event) {
//       this.setState({pass: event.target.value});
//     }
//     handleChangeE(event) {
//         this.setState({email: event.target.value});
//       }
  
//     handleSubmit(event) {
//         const { cookies } = this.props;
//         this.setState({ checking: true });
//         let user = {
//             username : this.state.name,
//             password : this.state.pass,
//             bdate : this.state.bdate,
//             email : this.state.email,
//             role : 'user',
//         }
//         console.log(user)
//         fetch(
//         `https://api-gamersgazette.herokuapp.com/auth/signup`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'text/plain'
//             },
//             body: JSON.stringify(user)
//             })
//             .then((res) => res.json())
//             .then((json) =>{
//                 console.log(json)
//                 console.log("sucessfully signed up!")  
//                 let d = new Date();
//                 d.setTime(d.getTime() + (30*60000));
//                 cookies.set(json.Name, json.Value, {expires: d});
//                 this.setState({ resp: json });
//             })
//             .catch((err)=>{
//                 console.log("Got error while signing up: "+err)
//                 this.setState({ err });
//                 })
//         event.preventDefault();
//         }
//     render() {
//       let { resp, error, email_is_empty, checking, already_logged_in} = this.state;
//         return (
//           <div>
//           {error && <p>{error.message}</p>}
//           {(resp || already_logged_in) && (
//             <Navigate to="/articles" replace={true} />
//           )}
//           <form onSubmit={this.handleSubmit}>
//             <label>
//               Password:
//               <input type="password" value={this.state.pass} onChange={this.handleChangeP} />
//             </label>
//             {email_is_empty===true && (
//             <label>
//                 Email:
//                 <input type="text" value={this.state.email} onChange={this.handleChangeE} />
//             </label>
//             )}
//             {!checking && (
//               <div>
//                 <input type="submit" value="Submit" />
//               </div>
//             )}
//           </form>
//           </div>
//         );
//       }
//     }

// export default VkForm;