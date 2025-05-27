import React from "react";

const options = [
    { label: "Preço (Menor)", value: { order_by: "price", order_direction: "asc" } },
    { label: "Preço (Maior)", value: { order_by: "price", order_direction: "desc" } },
    { label: "Desconto (Menor)", value: { order_by: "discount_percentage", order_direction: "asc" } },
    { label: "Desconto (Maior)", value: { order_by: "discount_percentage", order_direction: "desc" } },
];

export default function OrderSelect({ orderBy, orderDirection, onChange }) {
    return (
        <div className="flex items-center gap-2 mb-4 justify-end w-full">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Ordenar por:</label>
            <select
                className="p-2 border border-light-primary dark:border-dark-primary rounded-md text-sm bg-white dark:bg-dark-sidebar dark:text-white focus:ring-2 focus:ring-light-primary focus:border-light-primary transition-all duration-200 shadow-sm outline-none"
                value={`${orderBy}|${orderDirection}`}
                onChange={e => {
                    const [order_by, order_direction] = e.target.value.split("|");
                    onChange({ order_by, order_direction });
                }}
            >
                {options.map(opt => (
                    <option key={opt.label} value={`${opt.value.order_by}|${opt.value.order_direction}`}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}
