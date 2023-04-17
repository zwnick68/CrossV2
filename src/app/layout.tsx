import './globals.css'
import { Navbar } from "../../components/Navbar";
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <nav style= {{display: 'flex',flexDirection: 'row', padding: '10px 60px', background: 'black', alignItems: 'center', position: 'fixed', width: '100%', whiteSpace: 'nowrap', zIndex: '1',top: '0'}}>
          <Link href='/' style={{fontSize: '60px'}}>Cross MMA</Link>
          <Link href='/fighters' style={{fontSize: '40px'}}>Fighters</Link>
          <Link href='/events' style={{fontSize: '40px'}}>Events & Bouts</Link>       
        </nav>
        {children}</body>
    </html>
  )
}
