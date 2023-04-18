"use client"

import { getEvents } from '../../pages/api/lib/events'
import styles from '../../src/app/events/Events.module.css'
import Link from 'next/link'
import { use } from 'react'
import useSWR from 'swr'
import {useState, useEffect} from 'react'
import axios from 'axios'

import { sliceStartAtom, sliceEndAtom, currentPageAtom } from '../../storage/atom'
import { useAtom } from 'jotai'



// const fetchEvents = async () => {
 
//   const res = await req.json()
//   if (!req) throw new Error("Failed to fetch events")
//   return req
// }

const Events = () =>  {

const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom)
const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom)
const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
const [events, setEvents] = useState([])

const fetcher = (url) => axios.get(url).then((res) => res.data);
const {data} = useSWR("/api/events", fetcher)

useEffect(() => {
    if (data) {
       const sortedEvents = data.events.sort(function(a,b){
            return new Date(b.date) - new Date (a.date)
          })
        setEvents(sortedEvents)
    }
},[data])

  function nextPage() {
    console.log("working")
    // setCurrentSliceStart((c) => c + 4)
    setCurrentSliceEnd((c) => c + 15)
    setCurrentPage((c) => c + 1)
    
  }
  console.log(currentSliceStart, currentSliceEnd)
  const previousPage = () => {
      setCurrentSliceStart(currentSliceStart - 4)
      setCurrentSliceEnd(currentSliceEnd - 4)
      setCurrentPage(currentPage - 1)
  }

  return (
    <div>
      <ul>
        {events.slice(currentSliceStart, currentSliceEnd).map((event) => {
          return (
            <li key={event._id}>
              <Link href={`/events/${event._id}`}>
                <div className={styles.listContainer}>
                  <div className={styles.roundedBox}>
                    <div className={styles.boxName}>{event.name}</div>
                    <div className={styles.boxDateLocation}>{event.date}</div>
                    <div className={styles.boxDateLocation}>{event.location}</div>
                  </div>
                </div>
              </Link>
            </li>
        )})}
      </ul>
      <div className={styles.loadMore}>
      {/* {currentSliceStart >= 4 && <button onClick={previousPage}>previous</button>} */}
        {currentSliceEnd < events.length && <button className={styles.button} onClick={nextPage}>Load More</button>}
      </div>
    </div>
  )
}

export default Events