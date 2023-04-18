import React from 'react'
import styles from '../Events.module.css'
import { getEvent } from '../../../../pages/api/lib/events'
import { getBout } from '../../../../pages/api/lib/bouts'
import Link from 'next/link'

async function fetchEvent(eventID) {
    const event = await getEvent(eventID)
    if (!event) throw new Error("Failed to fetch event")
    const eventObj = event[0]
    return eventObj
  }
async function fetchBout(_id) {
    const bout = await getBout(_id)
    if (!bout) throw new Error("Failed to fetch bout")
    const boutObj = bout[0]
    return boutObj
}
 const EventPage = async (eventID) => {
    // console.log(eventID)
    const event = await fetchEvent(eventID)
    // console.log(event)
    const boutsArray = []
    for (let i = 0; i < event.bouts.length; i++) {
        boutsArray.push(await fetchBout(event.bouts[i]))
    }
    console.log(boutsArray)
  return (
    <div>
          <div className={styles.eventTitle}>
                <div className={styles.date}>{event.date}</div>
                <div className={styles.name}>{event.name}</div>
                <div className={styles.location}>{event.location}</div>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.header}>Fighters</div>
                <div className={styles.header}>Weightclass</div>
                <div className={styles.header}>Ending Round</div>
                <div className={styles.header}>Time</div>
                <div className={styles.header}>Format</div>
                <div className={styles.header}>Referee</div>
                <div className={styles.header}>Method</div>

                {boutsArray.map((bout) => {
                    return ( 
                         <div className={styles.row}>
                        {bout.loser ? <div className={styles.data}><Link href={`/fighters/${bout.winner?._id}`}><p className={bout.method  == "Could Not Continue" || bout.method == "Overturned" || bout.method == "DQ" ? styles.pDraw : styles.pWinner}>{bout.winner?.name}</p></Link>
                        <Link href={`/fighters/${bout.loser?._id}`}><p className={bout.method  == "Could Not Continue" || bout.method == "Overturned" || bout.method == "DQ" ? styles.pDraw : styles.pLoser}>{bout.loser?.name}</p></Link> </div> : 
                        <div className={styles.data} colspan="2"><Link href={`/fighters/${bout._id}`}><p className={styles.pDraw}>{bout.draw1?.name}</p><p className={styles.pDraw}>{bout.draw2?.name}</p></Link></div>}
                           <div className={styles.data}> <Link href={`/bouts/${bout._id}`}>{bout.boutType}</Link></div>
                           <div className={styles.data}><Link href={`/bouts/${bout._id}`}>{bout.endingRound}</Link></div>
                           <div className={styles.data}><Link href={`/bouts/${bout._id}`}>{bout.time}</Link></div>
                           <div className={styles.data}><Link href={`/bouts/${bout._id}`}>{bout.timeFormat}</Link></div>
                           <div className={styles.data}><Link href={`/bouts/${bout._id}`}>{bout.referee}</Link></div>
                           <div className={styles.data}><Link href={`/bouts/${bout._id}`}>{bout.method}</Link></div>
                       </div>
                       
                    )})}
            </div>  
    </div>             
  )
}

export default EventPage