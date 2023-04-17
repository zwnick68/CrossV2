// import React from 'react'
// import { getEvent } from '@lib/events'
// import styles from '.././Events.module.css'

// async function fetchEvent(eventID) {
//     const event = await getEvent(eventID)
//     if (!event) throw new Error("Failed to fetch event")
//     return event
//   }

//  const EventPage = async (eventID) => {

//     const event = await fetchEvent(eventID)
//     console.log(event)
    
//   return (
//     <div>
//     <ul>
//       {event.map((event) => {
//         return (
//           <li key={event._id}>
//               <div className={styles.listContainer}>
//                 <div className={styles.roundedBox}>
//                   <div className={styles.boxName}>{event.name}</div>
//                   <div className={styles.boxDateLocation}>{event.date}</div>
//                   <div className={styles.boxDateLocation}>{event.location}</div>
//                 </div>
//               </div>

//           </li>
//       )})}
//     </ul>
//   </div>
//   )
// }

// export default EventPage