import React, { PropTypes as T } from 'react'

import styles from '../../css/mainContainer.css'
import Home from '../components/Home'
import GitHubInfo from '../components/GitHubInfo'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();


export class Container extends React.Component {
  constructor(props){
    super(props)
    this.closeJoker = this.closeJoker.bind(this)
    this.state = {
        showJoker:true
    }
  }

  componentDidMount(){}

  componentDidUpdate(prevProps, prevState) {
  }

  closeJoker(){
      this.setState({showJoker:false})

  }

  render() {  
    return (
        <div className={styles.mainContainer}>
            <AppBar position="static" color="default" className={styles.appBar}>
                 <Toolbar> 
                    <Typography type="title" color="inherit">
                        Learning about React Progressive Web Apps
                     </Typography> 
                 </Toolbar> 
            </AppBar>
            <Home showJoker={this.state.showJoker}/>
            {!!this.state.showJoker && <Button className={styles.showGitHubButton} onClick={this.closeJoker} children="Click to Fetch Github Repo." color="primary"></Button>}
            {!this.state.showJoker && <GitHubInfo/>}
        </div>
    )
  }
}

export default  Container