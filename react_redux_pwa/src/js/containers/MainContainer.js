import React, { PropTypes as T } from 'react'
import {connect} from 'react-redux'

import styles from '../../css/mainContainer.css'
import Home from '../components/Home'
import Todo from '../components/Todo'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

const mapStateToProps = (state = {}) => {
    return {...state};
};

export class Container extends React.Component {
  constructor(props){
    super(props)
		// this.fetchGithubButton = this.fetchGithubButton.bind(this)
		// this.fetchRandomNumber = this.fetchRandomNumber.bind(this)
    // this.state = {
    //     getGithub:true
    // }
  }

  componentDidMount(){}

  componentDidUpdate(prevProps, prevState) {
  }

  // fetchRandomNumber() {
		
	// 	this.props.dispatch({type:"GENERATE_RANDOM_NUMBER",randomNumber:Math.random()})
	// }   

  render() {  
    return (
        <div className={styles.mainContainer}>
             <AppBar position="static" color="default" className={styles.appBar}>
                 <Toolbar> 
                    <Typography type="title" color="inherit">
                        [PART-2] Learning about React Progressive Web Apps
                     </Typography> 
                 </Toolbar> 
            </AppBar> 
						&nbsp;
            {/* <div>{this.props.randomNumber}</div>
            <Button onClick={this.fetchRandomNumber} children="Click to Generate Random number." color="primary" raised={true}></Button> */}
            <Home/>
						<Todo/>
        </div>
    )
  }
}

export default  connect(mapStateToProps)(Container)