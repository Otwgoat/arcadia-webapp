import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  Phone,
} from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p className="subh1">Nous contacter</p>
      <div id="socialIcons">
        <Link to="https://www.facebook.com">
          <FacebookLogo size={24} color="#fdf5e9" />
        </Link>
        <Link to="https://www.instagram.com">
          <InstagramLogo size={24} color="#fdf5e9" />
        </Link>
        <a href="tel:+33566676869">
          <Phone size={24} color="#fdf5e9" />
        </a>
        <Link to="/contact">
          <EnvelopeSimple size={24} color="#fdf5e9" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
