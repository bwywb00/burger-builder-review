import React, { Component } from 'react';
import classes from './Modal.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
            // Continue 버튼을 눌러도 spinner가 보이지 않는 이유는
            // purchasing state가 바뀔때만 Modal이 보이도록 설정 되었기 때문
            // loading state에 따라서 Modal의 내용이 바뀌게 끔 하려면
            // 아래의 코드를 추가해 주어야 한다
            || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;

// const modal = (props) => (
//     <Aux>
//         <Backdrop show={props.show} clicked={props.modalClosed} />
//         <div
//             className={classes.Modal}
//             style={{
//                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                 opacity: props.show ? '1' : '0'
//             }}
//         >
//             {props.children}
//         </div>
//     </Aux>

// );

// export default modal;
