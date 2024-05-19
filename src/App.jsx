import { useEffect, useState } from "react";

import "./App.css";

function App() {
    const [data, setData] = useState();
    const [value, setValue] = useState("");
    const [result, setResult] = useState(false);
    const [moeda, setMoeda] = useState("USD-BRL");
    const url = `https://economia.awesomeapi.com.br/json/last/${moeda}`;

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (moeda === "USD-BRL") setData(data.USDBRL.high);
                if (moeda === "EUR-BRL") setData(data.EURBRL.high);
                if (moeda === "BTC-BRL") setData(data.BTCBRL.high);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [moeda]);

    const handleChange = (event) => {
        setValue(event.target.value); //
    };

    const handleResult = () => {
        setResult(!result);
    };

    return (
        <div className="container">
            <div className="conversor-container">
                <h1>Conversor de Moedas</h1>
                <div className="input-container">
                    <label htmlFor="valor">R$</label>
                    <input type="number" name="valor" onChange={handleChange} />
                </div>

                <div className="option-container">
                    <div>
                        <input
                            onClick={() => setMoeda("USD-BRL")}
                            type="checkbox"
                            name="dolar"
                            id="dolar"
                        />
                        <label htmlFor="dolar">Dolar</label>
                    </div>
                    <div>
                        <input
                            onClick={() => setMoeda("EUR-BRL")}
                            type="checkbox"
                            name="euro"
                        />
                        <label htmlFor="euro">Euro</label>
                    </div>
                    <div>
                        <input
                            onClick={() => setMoeda("BTC-BRL")}
                            type="checkbox"
                            name="bitcoin"
                        />
                        <label htmlFor="libra">BitCoin</label>
                    </div>
                </div>

                <div className="conainer-btns">
                    <button onClick={handleResult}>Converter</button>
                    <button onClick={() => setResult(false)}>Limpar</button>
                </div>

                {result && (
                    <div className="resultado">
                        {"R$" + (value * data).toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
