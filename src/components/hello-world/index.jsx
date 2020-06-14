import React from 'react';
import PropTypes from 'prop-types';
import style from './hello-world.css';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import {fetchUsers} from '../../actions/productActions'


class HelloWorld extends React.Component {
	componentDidMount(){
		this.props.fetchUsers()

		console.log('this.props.users',this.props.users)
	}	

	render(){
		   return(
			  <div>
              {this.props.title}
              <Button color="danger">i am reactstrap!</Button>
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