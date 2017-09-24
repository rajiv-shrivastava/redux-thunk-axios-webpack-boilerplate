import 'bootstrap/dist/css/bootstrap.css'
import React,{Component} from 'react'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import Navigationbar from '../components/Navigationbar'
import {fetchPosts} from '../models/posts'
import {Link} from  'react-router'


class App extends Component
{
	componentWillMount() {
    this.props.fetchPosts()
	}
	
	render () {
		return (
			<div> App 

			<Navigationbar> </Navigationbar> 

			</div>
    )
  }
}


export default connect(state => ({
  posts: state.posts || [],

}), (dispatch, ownProps) => ({
  dispatch,
    fetchPosts: () => dispatch(fetchPosts())
}))(App)
