import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ShowItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/items`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              {['Item No', 'Name', 'Category', 'Subcategory', 'Cost Price', 'Sell Price', 'Quantity'].map(h => (
                <th key={h} className="p-2 border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.item_no} className="hover:bg-gray-50">
                <td className="p-2 border">{item.item_no}</td>
                <td className="p-2 border">{item.item_name}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">{item.subcategory}</td>
                <td className="p-2 border">{item.cost_price}</td>
                <td className="p-2 border">{item.sell_price}</td>
                <td className="p-2 border">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowItems;
