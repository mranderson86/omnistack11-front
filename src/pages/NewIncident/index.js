import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [incident, setIncident] = useState({
    title: "",
    description: "",
    value: 0
  });

  const history = useHistory();
  const ong_id = localStorage.getItem("ongId");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post(
        "/incidents",
        { ...incident, ong_id },
        {
          headers: {
            authorization: ong_id
          }
        }
      );

      alert("Cadastrado com Sucesso");

      history.push("/profile");
    } catch (error) {
      alert("Ocorreu erro ao cadastrar, tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título do caso"
            onChange={e => setIncident({ ...incident, title: e.target.value })}
          />
          <textarea
            placeholder="Descrição"
            onChange={e =>
              setIncident({ ...incident, description: e.target.value })
            }
          />
          <input
            placeholder="Valor em Reais"
            onChange={e => setIncident({ ...incident, value: e.target.value })}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
