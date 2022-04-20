import { useState } from "react"
import style from '../styles/header-card.module.css';

interface DataStruct {
    name: string
}

const HeaderGroup: React.VFC<DataStruct> = ({name}) => {

  return (
    <>
        <div className={`is-fullwidth mt-3 ${style.header}`}>
            <div className={style.overlay}></div>
            <h2 className='title is-2'>{name}</h2>
        </div>
    </>
  )
}

export default HeaderGroup


