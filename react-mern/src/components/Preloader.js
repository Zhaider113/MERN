
import React from 'react';
import { Image } from '@themesberg/react-bootstrap';

import ReactLogo from "../assets/img/technologies/loader.svg";

const Preloader = (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={100} />
    </div>
  );
};

export default Preloader;