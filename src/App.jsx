/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import FactText from "./components/text";
import { Check, Copy, StepForward } from "lucide-react";

const App = () => {
  const [fact, setFact] = useState("");
  const [origin, setOrigin] = useState("");
  const [trueFact, setTrueFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");
  const api = import.meta.env.VITE_API_KEY;
  const target = ["id", "su", "jw"];

  const getFact = async () => {
    setLoading(true);
    const rand = Math.floor(Math.random() * target.length);
    const targetTo = target[rand];
    try {
      const res = await axios.get(
        "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
      );

      const rawFact = res.data.text;
      const options = {
        method: "POST",
        url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "google-translate113.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          from: "en",
          to: targetTo,
          text: rawFact,
        },
      };
      try {
        const trans = await axios.request(options);
        setFact(trans.data.trans);
        setTrueFact(rawFact);
        setOrigin(targetTo);
      } catch (err) {
        console.error(err);
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    } finally {
      console.log("fact fetched...");
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fact);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    getFact();
  }, []);
  return (
    <main className="h-screen w-screen flex flex-col sm:px-20 px-4 gap-20 justify-center items-center bg-gradient-to-tr from-[#295A8C] to-[#f1f1f1]">
      <section className="w-full max-w-[600px] flex items-center justify-center bg-[#99D0F5] p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <p className="font-playfair text-2xl  text-white tracking-wide drop-shadow-md hover:scale-105 transition-transform duration-300">
          Fakta Nguwawur
        </p>
      </section>

      <div className="max-w-[500px] w-full h-[500px] relative flex items-center justify-center">
        {/* Latar belakang luar */}
        <div className="absolute inset-0 bg-[#99D0F5] rounded-[2rem] shadow-2xl" />

        {/* Card depan dengan efek kaca */}
        <div className="relative w-[92%] h-[92%] bg-[#f1f1f1] rounded-[2rem] shadow-lg p-10 flex items-center justify-center hover:shadow-2xl overflow-hidden">

          {/* Logo tengah di belakang teks */}
          <img
            src="/logo.svg"
            alt="Logo"
            height={180}
            width={180}
            className="absolute inset-0 m-auto opacity-15 z-0 animate-bounce-slow select-none"
          />

          {/* Teks */}
          <div className="relative z-10 text-center">
            <FactText fact={fact} trueFact={trueFact} loading={loading} />
          </div>
        </div>
      </div>


      <section className="w-full max-w-[600px] flex items-center justify-between bg-[#99D0F5] p-4 rounded-2xl shadow-lg">
        <div className="relative flex items-center">
          <button
            disabled={loading}
            className={`smooth ${loading
              ? "opacity-35 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
              }`}
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </button>
          <p
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] left-[150%] ${copied
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-[30%]"
              }`}
          >
            copied!
          </p>
        </div>
        <p
          className={`playfair smooth-slow ${loading ? "opacity-0" : "opacity-100"
            }`}
        >
          {origin == "id" ? "indonesia" : origin == "su" ? "sunda" : "jawa"}
        </p>
        <div className="relative flex items-center">
          <p
            className={`playfair smooth text-sm font-light absolute top-[50%] translate-y-[-50%] right-[150%] ${loading
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-[-30%]"
              }`}
          >
            Loading
          </p>
          <button
            onClick={() => {
              getFact();
            }}
            disabled={loading}
            className={`smooth ${loading
              ? "opacity-35 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
              }`}
          >
            <StepForward />
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
