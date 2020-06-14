import React from 'react';
import PropTypes from 'prop-types';
import style from './home.css';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import {fetchUsers} from '../../actions/productActions'
import {Link
} from "react-router-dom";


class HelloWorld extends React.Component {
	componentDidMount(){
		this.props.fetchUsers()

		console.log('this.props.users',this.props.users)
	}	

	render(){
		   return(
			  <div>
              {this.props.title}              
              i am home page with reactstrap design
              <Button color="danger">reactstrap design</Button>
              <p> <Link to={"/sampleroute"} > Sample react router link</Link> </p>
           </div>
			)
	}
}

HelloWorld.propTypes = {
  title: PropTypes.string,
};


const mapStateToProps = (state) => {
  return {
    users: state.users || [],
  };
}

export default connect(
  mapStateToProps,
  { fetchUsers }
)(HelloWorld);