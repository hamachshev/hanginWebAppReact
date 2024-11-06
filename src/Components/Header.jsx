import styles from "../Css/Header.module.css"
import SettingsPane from "./SettingsPane"
import { useState,useRef, useEffect } from "react"
import Cookies from "js-cookie"

export default function Header(){
     const [editing, setEditing] = useState(false)

     const [showSettings, setShowSettings] = useState(false)



    

    return (
    <div className={styles.header}>
            <img className={styles.logo} src='/images/hangin.svg'/>
           <div className={styles.settingsContainer}>
            <svg  className={styles.settings} onClick={(e)=>{setShowSettings(!showSettings); setEditing(false)}} xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
                <circle cx="27.1292" cy="27.1141" r="26.8177" fill="#063F78"/>
            </svg>
            {showSettings &&
                <SettingsPane {...{setEditing, editing, setShowSettings}}/>
            }
            </div>
    </div>
    )
}