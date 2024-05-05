"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Opiniao {
  nome: string;
  email: string;
  opiniao: string;
}

export default function Opiniao() {
  const [opinioes, setOpinioes] = useState<Opiniao[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opiniao, setOpiniao] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Opiniões estáticas como exemplo
  const opinioesEstaticas: Opiniao[] = [
    {
      nome: "João",
      email: "joao@example.com",
      opiniao: "Podiam melhorar serviço, estou parcialmente satisfeito!",
    },
    {
      nome: "Maria",
      email: "maria@example.com",
      opiniao: "Ótimos produtos entretando o atendimento está péssimo.",
    },
    {
      nome: "Pedro",
      email: "pedro@example.com",
      opiniao: "Podem melhorar mais!!!",
    },
  ];

  useEffect(() => {
    setOpinioes(opinioesEstaticas);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === opinioes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Troca de opinião a cada 5 segundos

    return () => clearInterval(intervalId);
  }, [opinioes]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (opiniao.trim() === "" || nome.trim() === "" || email.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const novaOpiniao = {
      nome: nome,
      email: email,
      opiniao: opiniao,
    };
    setOpinioes([...opinioes, novaOpiniao]);
    setOpiniao("");
    setNome("");
    setEmail("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">
        Deixe seu feedback construtivo:
      </h1>
      <div className="col-span-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-gray-700 font-semibold mb-2"
            >
              Seu Nome:
            </label>
            <input
              type="text"
              id="nome"
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black p-2"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Seu Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="opiniao"
              className="block text-gray-700 font-semibold mb-2"
            >
              Sua Opinião:
            </label>
            <textarea
              id="opiniao"
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black p-2"
              rows={4}
              value={opiniao}
              onChange={(e) => setOpiniao(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar Opinião
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4 p-4">
          Opinião dos últimos clientes:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {opinioes.map((opiniao, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-6 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-12 h-12 mr-4 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold">{opiniao.nome}</h2>
                  <p className="text-gray-500">{opiniao.email}</p>
                </div>
              </div>
              <p className="text-gray-700">{opiniao.opiniao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
