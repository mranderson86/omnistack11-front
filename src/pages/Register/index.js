import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    uf: ""
  });

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post("/ongs", data);

      //console.log(response.data);

      if (response.data) {
        setData({
          name: "",
          email: "",
          whatsapp: "",
          city: "",
          uf: ""
        });

        alert(
          `Por Favor, Anote seu ID.\nSeu ID de acesso: ${response.data.id}`
        );

        history.push("/");
      }
    } catch (error) {
      alert(`${error}`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            onChange={val => setData({ ...data, name: val.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={val => setData({ ...data, email: val.target.value })}
          />
          <input
            placeholder="Whatsapp"
            onChange={val => setData({ ...data, whatsapp: val.target.value })}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              onChange={val => setData({ ...data, city: val.target.value })}
            />
            <input
              placeholder="UF"
              style={{
                width: 80
              }}
              onChange={val => setData({ ...data, uf: val.target.value })}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
