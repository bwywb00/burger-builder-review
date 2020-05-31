// 전역적으로 에러를 처리하기 위한 hoc

// 1. error가 발생하면 Modal component의 show props를 true
// 2. 

import React, { Component } from 'react';
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        //axios 인터셉터(axios를 통한 request와 response를 전역적으로 처리하는 것 처럼 보일 수 있다?)

        componentDidMount() {

            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })

            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );

        }
    }
}

export default withErrorHandler;
