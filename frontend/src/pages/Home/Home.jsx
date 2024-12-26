import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommended from './Recommended'
import News from './News'
import Feature from '../../components/Feature'


const Home = () => {
  return (
    <>
    <Banner/>
    <Feature/>
    <TopSellers/>
    
   <Recommended/>
   
    </>
  )
}

export default Home