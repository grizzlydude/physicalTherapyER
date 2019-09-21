import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Login.css';

// action builder
import { setUser, loggedIN } from '../../redux/reducer';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            loggedin: false
        };
    };


    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        });
    };

    login = () => {
        console.log('Logged In');
        console.log('');
        console.log('state: ', this.state);
        console.log('');
        const { username, password, loggedin } = this.state;
        console.log('username: ', username);
        axios.post('/auth/login', { username, password, loggedin })
            .then(res => {
                this.props.setUser({ username, password });
                this.setState({
                    loggedIn: true
                });
                console.log('Logged In: ', this.state.loggedin);
                this.props.loggedIN(loggedIN);
                this.props.history.push('/');
            }).catch(err => {
                alert('Incorrect Username or Password');
            });
    };

    cancel = () => {
        this.setState({
            username: '',
            password: ''
        });
        this.props.history.push('/');
    };

    render() {
        return (
            <div className='loginBody'>
                <h1>Login</h1>
                <div className='loginInputs'>
                    <span>Username: </span>
                    <input type='text' onChange={(e) => this.handleChange(e, 'username')} />
                    <span>Password: </span>
                    <input type='password' onChange={(e) => this.handleChange(e, 'password')} />
                </div>
                <div className='loginButtons'>
                    <button onClick={this.login}>Login</button>
                    <button>Cancel</button>
                </div>
            </div>
        )
    };
}

export default connect(null, { setUser, loggedIN })(Login)