import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { translateDateMonthYear } from '../../utils/helper';

const HistoryGrapics = ({ data, width }) => {

    const [cfg, setCfg] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        const prices = data?.map((item) => {
            return item.price;
        })

        const labels = data?.map((item) => {
            item.created_at = translateDateMonthYear(item.created_at);
            return item.created_at;
        })

        setCfg({
            labels,
            datasets: [
                {
                    label: "Histórico de variação preço",
                    data: prices,
                    borderColor: "#408042",
                    backgroundColor: "#4CAF50"
                }
            ]
        })

    }, [data])
    return (
        <div className="lg:w-4/4 min-h-60 m-4">
            <Line data={cfg} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
}


export default HistoryGrapics;