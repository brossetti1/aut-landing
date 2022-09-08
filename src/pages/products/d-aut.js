import React from "react";
import Footer from "containers/Footer";
import MainWrapper from "../_main_wrapper";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import Navbar from "containers/Navbar";
import SectionTop from "containers/SectionTop";
import VideoTop from "containers/SectionTop/VideoTop";
import DAutTop from "containers/Products/dAut/dAutTop";

const Main = () => {
  return (
    <MainWrapper>
      <Sticky top={0} innerZ={200} activeClass="sticky-nav-active">
        <DrawerProvider>
          <Navbar />
        </DrawerProvider>
      </Sticky>

      <DAutTop />

      <Footer />
    </MainWrapper>
  );
};
export default Main;
