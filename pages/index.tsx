import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/search", {
        method: "POST"
      });
      console.log("Data", data.json());
    }
    fetchData();
  },[])
  return (
    <form action="/api/search" method='POST'>
      <label htmlFor="first">First Name</label>
      <input type="email" id="email" name="email" required />

      <button type="submit">Submit</button>
    </form>
  )
}

export default Home
