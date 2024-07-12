import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LegalNotice = () => {
  return (
    <div className="container">
      <Header />
      <main className="noticeContainer">
        <h1>Mentions Légales</h1>
        <h3>Editeur du site</h3>
        <p>Zoo Arcadia</p>
        <p>Adresse : 123 Rue des Animaux, 35700 Brocéliande</p>
        <p>Téléphone : 01 23 45 67 89</p>
        <p>Email : contact@arcadiazoo.fr</p>
        <h3>Directeur de la publication :</h3>
        <p>José Arcadia, Directeur</p>
        <h3>Hébergeur :</h3>
        <p>Hébergement Web XYZ</p>
        <p>Adresse : 456 Rue du Serveur, 75000 Paris</p>
        <p>Téléphone : 01 98 76 54 32</p>
        <p>Email : support@hebergementwebxyz.fr</p>
        <h3>Propriété intellectuelle :</h3>
        <p>
          Le contenu du site www.arcadiazoo.fr, incluant, de façon non
          limitative, les graphismes, images, textes, vidéos, animations, sons,
          logos, gifs et icônes ainsi que leur mise en forme sont la propriété
          exclusive de la société Zoo Arcadia, à l'exception des marques, logos
          ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
        </p>
        <p>
          Toute reproduction, distribution, modification, adaptation,
          retransmission ou publication, même partielle, de ces différents
          éléments est strictement interdite sans l'accord exprès par écrit de
          Zoo Arcadia. Cette représentation ou reproduction, par quelque procédé
          que ce soit, constitue une contrefaçon sanctionnée par les articles
          L.335-2 et suivants du Code de la propriété intellectuelle. Le
          non-respect de cette interdiction constitue une contrefaçon pouvant
          engager la responsabilité civile et pénale du contrefacteur.
        </p>
        <h3>Gestion des données personnelles :</h3>
        <p>
          Conformément aux dispositions de la loi 78-17 du 6 janvier 1978
          modifiée, relative à l'informatique, aux fichiers et aux libertés,
          vous disposez d'un droit d'accès, de rectification, de modification et
          de suppression des données qui vous concernent. Vous pouvez exercer ce
          droit en envoyant un courrier à Zoo Arcadia, 123 Rue des Animaux,
          35700 Brocéliande ou par email à contact@arcadiazoo.fr.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotice;
