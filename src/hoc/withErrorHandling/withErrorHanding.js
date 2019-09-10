import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandling = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null
            }

            this.axiosReq = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req;
            });
            this.axiosRes = axios.interceptors.response.use(res=> res, error => {
                this.setState({
                    error: error
                });
                return error;
            });
        }

        componentWillUnmount()
        {
            axios.interceptors.request.eject(this.axiosReq);
            axios.interceptors.response.eject(this.axiosRes);
        }

        errorConfirmedhandler() {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Aux>
                    <WrappedComponent {...this.props} />
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedhandler.bind(this)}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                </Aux>
            );
        }
    }
}

export default withErrorHandling;