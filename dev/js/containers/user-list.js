import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser, updateSearchusers} from '../actions/index'
import axios from 'axios';


class UserList extends Component {

    constructor(props){
        super(props);
        this.state = {
            "searchValue" : "",
            "userAllData": [],
        }
    }
    // renderList() {
        
    // }

    

    changeSearch(event){
        this.setState({searchValue: event.target.value});
        this.props.updateSearchusers(event.target.value);

        var passStr = "https://api.github.com/search/users?q=" + event.target.value;
        
        axios.get(passStr)
            .then( (response)=> {
                console.log(response);
                // userData = response.data.items; 
                this.setState({
                    userAllData : response.data.items,
                })
                return response.data.items;
                
            })
            .catch( (error)=> {
                console.log(error);
            });

    }

    render() {
        return (
            <div>
                <div>
                    <select>
                        <option>Sort By Name</option>
                        <option>Sort By Date One</option>
                        <option>Sort By Date Two</option>
                    </select>
                    <input type="text" name="searchValue" value={this.state.searchValue} onChange={this.changeSearch.bind(this)} />
                    <span>Search</span>
                </div>
                <div>Total Results: {this.props.users.length}</div>
                <div>
                    <ul>
                        {
                            this.state.userAllData.map((user) => {
                                return (
                                    <li
                                        key={user.id}
                                        onClick={() => this.props.selectUser(user)}
                                    >
                                        {user.login}
                                    </li>
                                );
                            })
                        }
                        
                    </ul>
                </div>
            </div>
            
        );
    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        users: state.users
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser: selectUser,updateSearchusers:updateSearchusers}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
