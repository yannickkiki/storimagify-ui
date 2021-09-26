import React from "react";

import {Urls} from "./../../data";

import api from "../../helpers/api";
import {Spinner} from "../../components";

class Login extends React.Component{

    /** Constructor*/

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            error: null,
            loading: null,
        };
    }

    /** End constructor*/


    /** Methods*/

    //Life cycle
    componentDidMount() {
    }

    //Setters


    //Getters


    //Helpers


    //Events

    onInputChange = (key, value) => {
        this.setState({[key]: value});
    };

    handleConnect = () => {
        this.setState({error: null}, () => {
            const {username, password} = this.state;
            if (!username || !password) {
                this.setState({error: "Username and password are required!"});
                return;
            }
            this.setState({loading: true});
            api.authenticateUser({ username: username, password: password })
                .then(({data}) => {
                    localStorage.setItem("userToken", data.access);
                    localStorage.setItem("userRefreshToken", data.refresh);
                    // localStorage.setItem("userTokenExpiresAt", data.token_expires_at);
                    this.props.history.push(Urls.repository.base);
                })
                .catch((err) => {
                    this.setState({loading: false});
                    this.setState({error: "Invalid username or password!"});
                    err.response && err.response.data && console.log(err.response.data[0]);
                    throw(err);
                });
        });
    };


    /** End methods*/


    /** Render*/

    render() {

        const {error, loading} = this.state;

        return (
            <React.Fragment>
                <div className="max-w-md mx-auto fullHeight flex justify-center items-center ">
                    <div className="w-full flex flex-col justify-center items-center px-5 py-10">
                        <div className="text-lg font-medium mt-6">
                            Login
                        </div>
                        <div className="flex flex-col justify-center items-start w-full mt-10">
                            <div className="text-sm">Username</div>
                            <div className="mt-3 flex w-full">
                                <input
                                    type="text"
                                    className="h-12 rounded w-full outline-none border-2 border-black px-3 text-base"
                                    onChange={({target}) => this.onInputChange("username", target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full mt-4">
                            <div className="text-sm">Password</div>
                            <input
                                type="password"
                                className="mt-3 h-12 rounded w-full outline-none border-2 border-black px-3 text-base"
                                onChange={({target}) => this.onInputChange("password", target.value)}
                            />
                        </div>
                        {error && <div className="text-red-600 mt-3 text-sm">{error}</div>}
                        <div
                            style={{backgroundColor: "#202027"}}
                            className="mt-6 rounded h-12 w-full border-0 px-3 text-sm text-gray-100 flex justify-center items-center font-semibold cursor-pointer"
                            onClick={this.handleConnect}
                        >
                            Login
                        </div>
                    </div>
                </div>
                {loading && <Spinner/>}
            </React.Fragment>
        );

    }

    /** End render*/
}

export default Login;
