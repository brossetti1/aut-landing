import AboutBottom from "containers/About/AboutBottom";
import AboutTop from "containers/About/AboutTop";
import React from "react";
import MainWrapper from "../_main_wrapper";

const Main = () => {
  return (
    <MainWrapper>
      <AboutTop />
      <AboutBottom />
    </MainWrapper>
  );
};
export default Main;
