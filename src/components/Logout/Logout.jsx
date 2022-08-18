import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Navigate} from "react-router-dom";
import {logout} from "../../store/actions/authActions";

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Navigate to="/" replace />
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);