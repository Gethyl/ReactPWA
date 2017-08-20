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
            {
                props.getGithub && 
                <div className={styles.rowFlex}>
                    Click on the button below to fetch all my Github repos :-) 
                </div>
            }
        </div>
    )
}

export default Home