import React from "react";
import NavBar from "../Layout/NavBar";
import GitHub from "../../Images/GitHub-Mark-32px.png";
import Logo from "../../Images/Logo.png";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  let coins = props.coins;
  window.scrollTo(0, 0);
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div id="header-home">
        <h1>
          BITDONUT<span>PROTOCOL</span>
        </h1>
        <p>
          Swap, earn, and build on the leading decentralized crypto trading
          protocol.
        </p>
        <a href="https://github.com/0xukhezo">
          <img src={GitHub}></img>
        </a>
      </div>
      <div id="section-one-home">
        <div>
          <h3>{coins.length}+</h3>
          <p>Cryptomonedas en curso</p>
        </div>
        <div>
          <h3>400+</h3>
          <p>Capitalizacion de Mercado</p>
        </div>
        <div>
          <h3>300+</h3>
          <p>Integraciones en Mercado</p>
        </div>
      </div>
      <div id="section-two-home">
        <div className="container1">
          <h3>300+</h3>
          <p>Integraciones en aplicaciones</p>
        </div>
        <div className="container2">
          <h3>Una red creciente de DeFi Apps.</h3>
          <p>
            Desarrolladores, operadores y proveedores de liquidez participan
            juntos en un mercado financiero abierto y accesible para todos.
          </p>
        </div>
      </div>
      <div id="section-three-home">
        <div className="text1">
          <Link to="/coins">
            <h3>Mercado</h3>
            <p>
              Accede a nuestro mercado de cryptomonedas donde podras disfrutar
              de más de {coins.length} monedas con toda la información de estas
              con un historico de más de 90 dás. Con un display en gráfico para
              que el usuario pueda ver en todo momento el precio de la moneda.
            </p>
          </Link>
        </div>
        <div className="text4">
          <img src={Logo} id="Logo-img"></img>
          <h3>Solicite financiación del Programa de Subvenciones BitDonut.</h3>
          <p>
            Construya aplicaciones y herramientas Defi en el mayor proyecto de
            criptografía en Ethereum. A su disposición para empezar dispone de
            todas las guías de inicio rápido, documentación de protocolos y un
            SDK de Javascript.
          </p>
        </div>
        <div className="text2">
          <Link to="/portfolio">
            <h3>Portfolio</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
        <div className="text3">
          <Link to="/convert">
            <h3>Conversor</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
