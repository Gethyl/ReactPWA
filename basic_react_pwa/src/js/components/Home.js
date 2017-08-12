import React from 'react'
import styles from '../../css/homeComponent.css'
import jokerGif from '../../images/joker.gif'

const Home = (props) =>  { 
    return (
        <div>
            <h2 className={styles.mainHeader}>First attempt to PWA</h2>
            {
                props.showJoker && 
                <div className={styles.rowFlex}>
                    <img className={styles.jokerGif} src={jokerGif} alt="Failed to Load picture. Are you offline?"/>
                </div>
            }
        </div>
    )
}

export default Home