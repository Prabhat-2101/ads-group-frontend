import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ShowBills = () => {
  const [bills, setBills] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredBills, setFilteredBills] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    filterBills();
  }, [searchName, filterDate, bills]);

  const fetchBills = async () => {
    try {
      setOpen(true);
      const res = await axios.get(`${BACKEND_URL}/api/bills`);
      setBills(res.data);
    } catch (err) {
      console.error('Error fetching bills:', err);
    } finally{
      setOpen(false);
    }
  };

  const filterBills = () => {
    let filtered = bills;
    setOpen(true);
    if (searchName.trim() !== '') {
      filtered = filtered.filter(bill =>
        bill.buyer_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterDate) {
      const selectedDate = new Date(filterDate);
      console.log(filterDate);
      filtered = filtered.filter(bill =>
        new Date(bill.timestamp).toDateString() === selectedDate.toDateString()
      );
    }

    setFilteredBills(filtered);
    setOpen(false);
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold">All Bills</h2>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by buyer name..."
          className="add-form-input"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="date"
          className="add-form-input"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {filteredBills.length === 0 ? (
        <p className="text-gray-500">No bills found.</p>
      ) : (
        <div className="">
          {filteredBills.map((bill) => (
            <div key={bill._id} className="bill-card">
              <div className="mb-2">
                <p><strong>Bill ID:</strong> {bill.bill_id}</p>
                <p><strong>Name:</strong> {bill.buyer_name}</p>
                <p><strong>Address:</strong> {bill.address}</p>
                <p><strong>Mobile:</strong> {bill.mobile_number}</p>
                <p><strong>Date:</strong> {new Date(bill.timestamp).toLocaleDateString()}</p>
              </div>

              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc pl-5">
                  {bill.items.map((item, idx) => (
                    <li key={idx}>
                      {item.item_name} - ₹{item.sell_price} × {item.quantity} = ₹{item.sell_price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-2 font-bold">Total: ₹{bill.total_amount}</p>
            </div>
          ))}
        </div>
      )}
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 10 })}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ShowBills;
