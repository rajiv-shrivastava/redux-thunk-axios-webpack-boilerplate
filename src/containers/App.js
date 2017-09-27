import 'bootstrap/dist/css/bootstrap.css'
import React,{Component} from 'react'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import Header from '../components/ui-components/Header'
import {fetchPosts} from '../models/posts'


class App extends Component
{
	componentWillMount() {
    this.props.fetchPosts()
	}
	
	render () {
		return (
			<div> 
			<Header />
 
			<div className="content">
           {this.props.children}
         </div>



		
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
