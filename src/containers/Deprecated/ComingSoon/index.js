import Image from "common/components/Image";
import BannerArea from "./coming-soon.style";
import React, { useEffect } from "react";
import Text from "common/components/Text";
import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ComingSoonData } from "common/data";

const ComingSoon = ({ onEnabled }) => {
  const { title, logo } = ComingSoonData;
  const [initialized, setInitialized] = useState(true);
  const [width, setWidth] = useState(250);
  const [start, setStart] = useState(null);
  const [scale, setScale] = useState(0);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    if (window.scrollY > 0) {
      setStop(true);

      setScale(1);
      const maxWidth =
        "ontouchstart" in window
          ? window.innerWidth - 30
          : window.innerWidth / 2;
      setWidth(maxWidth);

      if (onEnabled) {
        onEnabled(true);
      } else {
        document.documentElement.style.overflow = "auto";
      }

      return;
    } else if (!stop) {
      document.documentElement.style.overflow = "hidden";
    }

    if (initialized && "ontouchstart" in window) {
      setWidth(150);
      setInitialized(false);
    }

    const handleScroll = (e) => {
      const minZoom = 250;
      const maxZoom = window.innerWidth / 2;
      const zoomSpeed = 0.07;
      const min = Math.min(1, -e.wheelDelta || -e.detail);
      const delta = Math.max(-1, min) * zoomSpeed;
      const finalWidth = Math.max(
        minZoom,
        Math.min(maxZoom, width + minZoom * delta)
      );

      setScale(finalWidth === maxZoom ? 1 : 0);
      setWidth(finalWidth);
      if (finalWidth === maxZoom) {
        setStop(true);
        setTimeout(() => {
          if (onEnabled) {
            onEnabled(true);
          } else {
            document.documentElement.style.overflow = "auto";
          }
        }, 500);
      }
    };

    const _onTouchStart = (e) => {
      setStart(e.changedTouches[0]);
    };

    const _onTouchMove = (e) => {
      let end = e.changedTouches[0];
      const move = -(end.screenY - start.screenY);

      const minZoom = 150;
      const maxZoom = window.innerWidth - 30;
      const zoomSpeed = 0.2;
      const min = Math.min(1, move);
      const delta = Math.max(-1, min) * zoomSpeed;

      const finalWidth = Math.max(
        minZoom,
        Math.min(maxZoom, width + minZoom * delta)
      );

      setScale(finalWidth === maxZoom ? 1 : 0);
      setWidth(finalWidth);

      if (finalWidth === maxZoom) {
        setStop(true);
        setTimeout(() => {
          if (onEnabled) {
            onEnabled(true);
          } else {
            document.documentElement.style.overflow = "auto";
          }
        }, 500);
      }
    };

    if ("ontouchstart" in window) {
      window.addEventListener("touchstart", _onTouchStart);
      window.addEventListener("touchmove", _onTouchMove);
    } else {
      window.addEventListener("wheel", handleScroll);
    }

    if (stop) {
      if ("ontouchstart" in window) {
        window.removeEventListener("touchend", _onTouchStart);
        window.removeEventListener("touchmove", _onTouchMove);
      } else {
        window.removeEventListener("wheel", handleScroll);
      }
    }
    return () => {
      if ("ontouchstart" in window) {
        window.removeEventListener("touchend", _onTouchStart);
        window.removeEventListener("touchmove", _onTouchMove);
      } else {
        window.removeEventListener("wheel", handleScroll);
      }
    };
  }, [width, scale, start, initialized, stop]);

  return (
    <>
      <BannerArea id="banner">
        <MotionConfig reducedMotion="user">
          <motion.div
            animate={{
              ...(!stop && {
                scale: [1, 1.3, 1],
              }),
            }}
            transition={{
              ...(!stop && {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }),
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              viewBox="0 0 935.725 444.683"
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x2="1"
                  y1="0.5"
                  y2="0.5"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#009fe3"></stop>
                  <stop offset="0.08" stopColor="#0399de"></stop>
                  <stop offset="0.19" stopColor="#0e8bd3"></stop>
                  <stop offset="0.3" stopColor="#2072bf"></stop>
                  <stop offset="0.41" stopColor="#3a50a4"></stop>
                  <stop offset="0.53" stopColor="#5a2583"></stop>
                  <stop offset="0.71" stopColor="#453f94"></stop>
                  <stop offset="0.88" stopColor="#38519f"></stop>
                  <stop offset="1" stopColor="#3458a4"></stop>
                </linearGradient>
              </defs>
              <g data-name="Layer 1" transform="rotate(65 465.376 730.493)">
                <g data-name="Group 4">
                  <path
                    fill="#bfbfbf"
                    d="M0 0l8.24 303.22 3.53 366.19-3.53 357.56z"
                    data-name="Path 10"
                  ></path>
                  <path
                    fill="url(#linear-gradient)"
                    d="M1.77 0l5.07 217.94v141.91L10 544.21v482.76L1.77 674.09V0z"
                    data-name="Path 11"
                  ></path>
                </g>
              </g>
            </svg>
          </motion.div>

          <motion.div
            initial={false}
            className="logo-animation"
            animate={{
              // scale: scale,
              opacity: scale,
            }}
          >
            <Image alt="aut-logo" src={logo.src} />
          </motion.div>

          <motion.div
            className="text-animation"
            initial={false}
            animate={{
              opacity: scale,
            }}
          >
            <Text className="coming-soon-text" content={title} />
          </motion.div>
        </MotionConfig>
      </BannerArea>
    </>
  );
};

export default ComingSoon;
