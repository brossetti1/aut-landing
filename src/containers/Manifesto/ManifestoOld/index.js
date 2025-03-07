import Image from "common/components/Image";
import BannerArea from "./index.style";
import React, { useEffect } from "react";
import Link from "next/link";
import NextImage from "common/components/NextImage";
import Text from "common/components/Text";
import aut from "common/assets/image/aut-logo.svg";
import { FooterData } from "common/data";
import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterFormOld from "common/components/NewsletterForm/Old";

const mailchimpUrl =
  "https://skillwallet.us20.list-manage.com/subscribe/post?u=d961a0504e2d77cc544c89c33&amp;id=0599e9c37b&tags=3002995";

const ComingSoonManifest = () => {
  const [initialized, setInitialized] = useState(true);
  const [start, setStart] = useState(null);
  const [width, setWidth] = useState(250);
  const [scale, setScale] = useState(0);
  const { social } = FooterData;

  useEffect(() => {
    if (initialized) {
      setInitialized(false);
      setScale(1);
      if ("ontouchstart" in window) {
        setWidth(window.innerWidth);
      } else {
        setWidth(window.innerWidth / 2);
      }
    }
  }, [width, scale, start, initialized]);

  return (
    <>
      <BannerArea id="banner">
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

        <MotionConfig reducedMotion="user">
          <motion.div
            initial={false}
            className="logo-animation"
            animate={{
              opacity: scale,
            }}
          >
            <Image alt="aut-logo" src={aut.src} />
          </motion.div>

          <motion.div
            className="text-animation"
            initial={true}
            animate={{
              opacity: scale,
            }}
          >
            <Text
              className="manifesto-title"
              content="De-Renaissance: a Collective Manifesto"
            />
            <Text
              className="manifesto-subtitle"
              content="starts the 2nd generation of DAOs."
            />
            <Text
              className="manifesto-subtitle"
              content="It lives on-chain, and it’s owned by you."
            />
            <Text
              className="manifesto-email"
              content="Add your email to sign (& own) each piece of it."
            />
            <MailchimpSubscribe
              url={mailchimpUrl}
              render={(props) => {
                const { subscribe, status, message } = props || {};
                return (
                  <NewsletterFormOld
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                );
              }}
            />
          </motion.div>

          <motion.div
            className="socials-animation"
            initial={false}
            animate={{
              opacity: scale,
            }}
          >
            <div className="social-links">
              {social.map(({ link, icon }, index) => (
                <Link href={link} key={`footer-social-key-${index}`}>
                  <a target="_blank">
                    <NextImage src={icon} alt="social image" />
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        </MotionConfig>
      </BannerArea>
    </>
  );
};

export default ComingSoonManifest;