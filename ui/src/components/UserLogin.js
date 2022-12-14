import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import React from 'react';


class UserLogin extends React.Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData(){
        // document.getElementById("scanner-main").style.display="none";
        document.getElementById("navbar").style.display="none";
        ReactSession.set("userId", null);
        ReactSession.set("type", null);

    }
    async loginVerify(user) {
        console.log("inside loginVerify"+ JSON.stringify(user));
        const query = `
            query userLogin($user: UserInputs!) {
                userLogin(user: $user) {
                    userId
                    password
                    userType{role} 
                } 
            }`;
        const data = await graphQLFetch(query, { user });
        return data;
    }
    async submit(e) {
        e.preventDefault();
        const form = document.forms.login;
        const user = {
            userId: form.userId.value,
            password: form.password.value
        }
        const response = await this.loginVerify(user);
        console.log(JSON.stringify(response)+"    "+response.userLogin+"   response + _++++"+response)
        ReactSession.set("userId", response.userLogin?.userId);
        ReactSession.set("type", response.userLogin?.userType.role);
        const { history } = this.props;
        if(response.userLogin== null){
            history.push({
              pathname: '/',
            });
        }else{
            document.getElementById("navbar").style.display="block";
            history.push({
                 pathname: '/products',
               });
        }
        
        // else if(response.userLogin.userType.role == "Associate" || response.userLogin.userType.role == "Supervisor"){            
        // document.getElementById("navbar").style.display="block";
        //     history.push({
        //         pathname: '/barcode',
        //       });
        // }else if(response.userLogin.userType.role == "Admin"){
        //     document.getElementById("navbar").style.display="block";
        //     history.push({
        //       pathname: '/adminBoard',
        //     });
        // }
    }

    render() {
        const fieldstyles = {
            width: '50%',
            padding: '12px 20px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontWeight: 'bolder'
        };
        const buttonStyles = {
            width: '30%',
            backgroundColor: '#000000',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
        return (
            <form name="login" onSubmit={this.submit}>
                
                <div class="content">
            </div>
            <div class="content-left">
            </div>
                <div class="loginForm">
                    <div>
                <label for='userId'>User id</label>
                <input type="text" id='userId' name="userId" placeholder="User Id" style={fieldstyles} required />
                </div>
                <div>
                <label for='password'>Password</label>
                <input type="password" id='password' name='password' placeholder="Password" style={fieldstyles} required />
                </div>                
                <button type='submit' class="btn" style={buttonStyles}>Login</button>
                </div>
            </form>
        )
    }
}
export default withRouter(UserLogin);