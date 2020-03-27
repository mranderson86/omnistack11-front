import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

import "./styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ong = {
    name: localStorage.getItem("ongName"),
    id: localStorage.getItem("ongId")
  };

  useEffect(() => {
    async function loadIncidents() {
      const response = await api.get("/profiles", {
        headers: {
          authorization: ong.id
        }
      });

      if (response.data) {
        setIncidents(response.data);
      }
    }

    loadIncidents();
  }, [ong.id]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          authorization: ong.id
        }
      });

      // Fira Code - Font Ligatures

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Erro ao excluir um caso, tente novamente");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ong.name}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => {
          return (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(incident.value)}
              </p>

              <button
                type="button"
                onClick={() => handleDeleteIncident(incident.id)}
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
