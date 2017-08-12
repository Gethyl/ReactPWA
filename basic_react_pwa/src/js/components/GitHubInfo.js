import React, { PropTypes as T } from 'react'
import {connect} from 'react-redux'

import List, { ListItem } from 'material-ui/List'

import styles from '../../css/githubInfo.css'

export default class Container extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fetchError:false
    }
  }

  componentDidMount(){
    fetch('https://api.github.com/users/Gethyl/repos')
    .then(res => res.json())
    .then(res => {
        // console.info("Response",res)
        const repoArray = res.map(item => {
          return {
            repoName: item.name
          }
        })
        this.setState({repoArray, fetchError:false})
    })
    .catch(err => {
      console.error("Error ",err)
      this.setState({fetchError:true})
    })
  }

  componentDidUpdate(prevProps, prevState) {
  }

  componentWillMount(){
  }

  render() {  
    // debugger;
    return (
        <div>
            <hr/>
            <h4 style={{'textAlign': 'center'}}>Github Repositories </h4>
            <hr/>
            {!!this.state.repoArray && 
             <List className={styles.repoList}>
              {this.state.repoArray.map((repo,i) => <ListItem className={styles.repoListItem} key={i}>{repo.repoName}</ListItem>)}
             </List>
            }
            {!!this.state.fetchError && <h3>Unexpected Error or Probably Offline.. :|</h3>}
        </div>
    )
  }
}