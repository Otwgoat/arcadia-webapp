import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="container noticePage">
      <Header />
      <main className="noticeContainer">
        <h1 id="privacyPolicyTitle">Politique de Confidentialité</h1>
        <p>
          Chez Zoo Arcadia, nous nous engageons à protéger la vie privée de nos
          visiteurs. Cette politique de confidentialité explique comment nous
          collectons, utilisons, stockons et protégeons vos informations
          personnelles.
        </p>
        <h3>1. Collecte des Informations</h3>
        <p>
          Nous collectons des informations lorsque vous nous contactez via notre
          formulaire de contact. Les informations collectées incluent votre nom,
          prénom et votre adresse e-mail, mais aussi les informations collectées
          automatiquement, telles que votre adresse IP, type de navigateur,
          pages visitées et durée de la visite, via des cookies et des
          technologies similaires.
        </p>
        <h3>2. Utilisation des Informations</h3>
        <p>Nous utilisons les informations collectées pour :</p>
        <ul>
          <li>Fournir et améliorer nos services.</li>
          <li>Répondre à vos demandes et communiquer avec vous.</li>
          <li>Personnaliser votre expérience sur notre site web.</li>
          <li>
            Analyser l'utilisation de notre site pour en améliorer la
            performance et les fonctionnalités.
          </li>
        </ul>
        <h3>3. Partage des Informations</h3>
        <p>
          Nous ne vendons, n'échangeons ni ne transférons vos informations
          personnelles à des tiers sans votre consentement, sauf dans les cas
          suivants :
        </p>
        <ul>
          <li>
            Aux fournisseurs de services tiers qui nous aident à exploiter notre
            site web et à vous fournir nos services, à condition qu'ils
            s'engagent à protéger la confidentialité de vos informations.
          </li>
          <li>
            Si la loi l'exige ou pour protéger nos droits, notre propriété ou
            notre sécurité.
          </li>
        </ul>
        <h3>4. Contact</h3>
        <p>
          Si vous avez des questions ou des préoccupations concernant cette
          politique de confidentialité, veuillez nous contacter à l'adresse
          suivante :
        </p>
        <p>Zoo Arcadia</p>
        <p>Adresse : 123 Rue des Animaux, 35700 Brocéliande</p>
        <p>Téléphone : 01 23 45 67 89</p>
        <p>Email : contact@arcadiazoo.fr</p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
