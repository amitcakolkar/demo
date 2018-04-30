import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class UserDetail extends Component {
    render() {
        if (!this.props.user) {
            return (<div>Select a user...</div>);
        }
        return (
            <div>
                <img src={this.props.user.avatar_url} />
                <h2>{this.props.user.login}</h2>
                <h3>Profile Url: {this.props.user.url}</h3>
                <h3>followers Url: {this.props.user.followers_url}</h3>
                <h3>gists Url: {this.props.user.gists_url}</h3>
            </div>
        );
    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}

export default connect(mapStateToProps)(UserDetail);
