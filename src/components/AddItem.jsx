import React, { useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.BACKEND_URL;

const AddItem = () => {
  const [form, setForm] = useState({
    item_no: '', item_name: '', category: '', subcategory: '',
    cost_price: '', sell_price: '', quantity: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/items/add`, form);
      alert("Item added successfully");
      setForm({ item_no: '', item_name: '', category: '', subcategory: '', cost_price: '', sell_price: '', quantity: '' });
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Add New Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 add-form">
        {Object.entries(form).map(([key, val]) => (
          <input key={key}
            name={key}
            value={val}
            onChange={handleChange}
            placeholder={key.replace(/_/g, ' ').toUpperCase()}
            required
            className="add-form-input"
          />
        ))}
        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
