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

        // axios 인터셉터(axios를 사용하는 컴포넌트에서request와 response 핸들링 해주는 뭐.. 그런 기능)

        // BurgerBuilder의 ComponentDidMount() 메소드 안에서 발생하는 문제를 해결하기 위해서
        // 먼저 axios.interceptors를 만들어준다
        UNSAFE_componentWillMount() {

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
