import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  Phone,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import servicesApi from "../services/servicesApi";

const Footer = () => {
  const planningRender = () => {
    return (
      <>
        <p>
          Lundi : <span>Fermé</span>
        </p>
        <p>
          Mardi :{" "}
          <span>{planning && formatHour(planning.Mardi.ouverture)}</span> -{" "}
          <span>{planning && formatHour(planning.Mardi.fermeture)}</span>
        </p>
        <p>
          Mercredi :{" "}
          <span>{planning && formatHour(planning.Mercredi.ouverture)}</span> -{" "}
          <span>{planning && formatHour(planning.Mercredi.fermeture)}</span>
        </p>
        <p>
          Jeudi :{" "}
          <span>{planning && formatHour(planning.Jeudi.ouverture)}</span> -{" "}
          <span>{planning && formatHour(planning.Jeudi.fermeture)}</span>
        </p>
        <p>
          Vendredi :{" "}
          <span>{planning && formatHour(planning.Vendredi.ouverture)}</span> -{" "}
          <span>{planning && formatHour(planning.Vendredi.fermeture)}</span>
        </p>
        <p>
          Samedi :{" "}
          <span>{planning && formatHour(planning.Samedi.ouverture)}</span> -{" "}
          <span>{planning && formatHour(planning.Samedi.fermeture)}</span>
        </p>
        <p>
          Dimanche :{" "}
          <span>{planning && formatHour(planning.Dimanche.ouverture)}</span> -{" "}
          <span>{planning && formatHour(planning.Dimanche.fermeture)}</span>
        </p>
        <p>
          Restaurant :{" "}
          <span>
            {planning && formatHour(planning.Restaurant.ouverture)} -{" "}
            {planning && formatHour(planning.Restaurant.fermeture)}
          </span>
        </p>
        <p>
          Ouvert tous les jours durant les vacances scolaires et les jours
          feriés de{" "}
          <span>
            {planning &&
              formatHour(planning["Ouvertures exceptionnelles"].ouverture)}
          </span>{" "}
          à{" "}
          <span>
            {" "}
            {planning &&
              formatHour(planning["Ouvertures exceptionnelles"].fermeture)}
          </span>
          .
        </p>
      </>
    );
  };
  const formatHour = (hour) => {
    if (!hour) return ""; // Retourne une chaîne vide si l'heure n'est pas définie
    const [hh, mm] = hour.split(":");
    return `${hh}H${mm}`;
  };
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { data: planning } = useQuery({
    queryKey: ["planning"],
    queryFn: servicesApi.getPlanning,
    staleTime: 2000,
  });

  useEffect(() => {
    console.log(planning);
  }, [planning]);
  return (
    <>
      {isDesktop ? (
        <footer>
          <div id="openingPlanning">
            <p className="subh1">Horaires d'ouverture</p>
            <div id="planningPlaceholders">{planningRender()}</div>
          </div>
          <div id="contact">
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
          </div>
          <div id="discoverApp">
            <p className="subh1">Découvrir</p>
            <div id="links">
              <Link to={"/services"}>Nos services</Link>
              <Link to={"/habitats"}>Nos habitats</Link>
              <Link to={"/contact"}>Nous contacter</Link>
            </div>
          </div>
          <div className="links">
            <Link to={"/mentions-legales"}>Mentions légales</Link>
            <Link to={"/politique-confidentialite"}>
              Politique de confidentialité
            </Link>
          </div>
          <p id="footerBottom">2024 Zoo Arcadia. Tous droits réservés.</p>
        </footer>
      ) : (
        <footer>
          <div id="contact">
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
          </div>

          <div id="openingPlanning">
            <p className="subh1">Horaires d'ouverture</p>
            <div id="planningPlaceholders">{planningRender()}</div>
          </div>
          <div className="links">
            <Link to={"/mentions-legales"}>Mentions légales</Link>
            <Link to={"/politique-confidentialite"}>
              Politique de confidentialité
            </Link>
          </div>
          <p id="footerBottom">2024 Zoo Arcadia. Tous droits réservés.</p>
        </footer>
      )}
    </>
  );
};

export default Footer;
