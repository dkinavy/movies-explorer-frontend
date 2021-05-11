import React from 'react';
import Hero from './Hero/Hero';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio'

const Main = () => {
  return (
    <>
      <Hero />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>
  );
}
export default Main;