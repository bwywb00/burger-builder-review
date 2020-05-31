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

        UNSAFE_componentWillMount() {

            // axios.interceptors를 컨트롤 하기 위해서는 특정 변수에 저장해서 다뤄야 한다
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        // hoc함수는 다양한 곳에서 사용될 수 있는데
        // 사용하지 않는 컴포넌트에서는 위에서 생성한 axios.interceptors를 제거해야 
        // 메모리가 새는 것을 방지할 수 있다
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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
