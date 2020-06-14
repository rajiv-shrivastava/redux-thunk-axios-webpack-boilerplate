import React from 'react';
import PropTypes from 'prop-types';
import style from './home.css';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import {fetchUsers} from '../../actions/productActions'
import {Link
} from "react-router-dom";


class Home extends React.Component {
	componentDidMount(){
		this.props.fetchUsers()
	}	

	render(){
		let {users} = this.props

		   return(
			  <div>
              {this.props.title}              
              i am home page with reactstrap design
              <Button color="danger">reactstrap design</Button>
              <p> <Link to={"/sampleroute"} > Sample react router link</Link> </p>
              <h3> Sample Date from jsonplaceholder mock apis :- </h3>
              <p> {users && users.length > 0 ? users[0].id: ''} {users && users.length > 0 ? users[0].name: ''} </p>
           </div>
			)
	}
}

Home.propTypes = {
  title: PropTypes.string,
};


const mapStateToProps = (state) => {
	console.log("state.users",state.userReducer.users)
  return {
    users: state.userReducer.users || [],
  };
}

export default connect(
  mapStateToProps,
  { fetchUsers }
)(Home);