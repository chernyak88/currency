import React from 'react'
import s from './QuoteView.module.css'

function QuoteView(props) {
  return (
    <div className={s.QuoteView}>
        <h1>Курс {props.currency} по отношению к российскому рублю</h1>
        <ul>
          {props.rate && <li>{props.nominal} {props.currency} = {props.rate} рублей</li>}
          {!props.rate && <li className={s.error}>сервис временно недоступен</li>}
        </ul>
    </div>
  )
}

export default QuoteView