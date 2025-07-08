import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { translateDateMonthYear } from "../../utils/helper";

// Função para formatar valores como moeda
const formatCurrency = (value) => {
    return `R$ ${(value / 100).toFixed(2)}`;
};

const HistoryGrapics = ({ data, width }) => {
    const [cfg, setCfg] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const prices = data?.map((item) => item.price);

        const labels = data?.map((item) => {
            item.created_at = translateDateMonthYear(item.created_at);
            return item.created_at;
        });

        setCfg({
            labels,
            datasets: [
                {
                    label: "Histórico de variação preço mínimo",
                    data: prices, // Usa os valores brutos aqui
                    borderColor: "#408042",
                    backgroundColor: "#4CAF50"
                }
            ]
        });
    }, [data]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw; // Valor bruto do ponto
                        return formatCurrency(value); // Formata como moeda
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return formatCurrency(value); // Formata o eixo Y como moeda
                    }
                }
            }
        }
    };

    return (
        <div className="lg:w-4/4 min-h-60 m-4">
            <Line data={cfg} options={options} />
        </div>
    );
};

export default HistoryGrapics;
