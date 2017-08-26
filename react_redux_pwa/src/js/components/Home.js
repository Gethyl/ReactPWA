import React from 'react'
import styles from '../../css/homeComponent.css'

const Home = (props) =>  { 
    return (
			<div style={{
				border: '1px solid #ddd',
				borderRadius: 10,
				padding:'10px 10px 30px'
			}}>
            <h2 className={styles.mainHeader}>Let us learn PWA</h2>
						<h4 style={{textAlign:'center'}}>We will learn how to handle PWA for React-Redux app</h4>
        </div>
    )
}

export default Home