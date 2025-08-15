import { useEffect, useState } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import BillPDF from './BillPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { set } from 'zod';
const BACKEND_URL = import.meta.env.BACKEND_URL;

const GenerateBill = () => {
  const [buyer, setBuyer] = useState({ buyer_name: '', address: '', mobile_number: '' });
  const [itemsList, setItemsList] = useState([]);
  const [billItems, setBillItems] = useState([{ item_no: '', quantity: 1 }]);
  const [pdfData, setPdfData] = useState(null);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/items`)
      .then(res => setItemsList(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...billItems];
    newItems[index][field] = value;
    setBillItems(newItems);
  };

  const addRow = () => setBillItems([...billItems, { item_no: '', quantity: 1 }]);
  const removeRow = (index) => setBillItems(billItems.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billPayload = {
      ...buyer,
      items: billItems.map(bi => ({
        item_no: bi.item_no,
        quantity: Number(bi.quantity)
      }))
    };

    try {
      setOpen(true);
      const res = await axios.post(`${BACKEND_URL}/api/bills/generate`, billPayload);
      setPdfData(res.data.bill);
      setBuyer({ buyer_name: '', address: '', mobile_number: '' });
      setBillItems([{ item_no: '', quantity: 1 }]);
    } catch (err) {
      console.error(err);
      alert("Failed to generate bill. Quantity is not sufficient or item not found.");
    } finally{
      setOpen(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Generate Bill</h2>
      <form onSubmit={handleSubmit} className='add-form'>
        <div className="flex flex-col buyer-form">
          <input
            name="buyer_name"
            placeholder="Buyer Name"
            value={buyer.buyer_name}
            onChange={handleBuyerChange}
            className="border-b p-2 add-form-input"
            required
          />
          <input
            name="mobile_number"
            placeholder="Mobile Number"
            value={buyer.mobile_number}
            onChange={handleBuyerChange}
            className="border-b p-2 add-form-input"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={buyer.address}
            onChange={handleBuyerChange}
            className="border-b p-2 add-form-input"
            required
          />
        </div>

        <h3 className="text-lg font-medium mt-6 mb-2">Items in Bill</h3>
        <div className='bill-form'>
          {billItems.map((row, idx) => (
            <div key={idx} className="bill-item-grid">
              <select
                value={row.item_no}
                onChange={e => handleItemChange(idx, 'item_no', e.target.value)}
                className="border-b p-2 flex-1 add-bill-input"
                required
              >
                <option value="">Select Item</option>
                {itemsList.map(item => (
                  <option key={item.item_no} value={item.item_no}>
                    {item.item_name} ({item.item_no})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                value={row.quantity}
                onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                className="border-b p-2 w-24 add-bill-input"
                required
              />
              {billItems.length > 1 && (
                <button type="button" onClick={() => removeRow(idx)} className="delete-button">
                  <DeleteIcon className='delete-icon'/>
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addRow} className="flex items-center submit-button">
            <AddIcon /> Add Row
          </button>
        </div>

        <button type="submit" className="submit-button">
          Generate Bill
        </button>
      </form>

      {pdfData && (
        <div className="mt-4">
          <PDFDownloadLink
            document={
              <BillPDF
                buyer={{buyer_name: pdfData.buyer_name, address: pdfData.address, mobile_number: pdfData.mobile_number, bill_id: pdfData.bill_id}}
                items={pdfData.items}
              />
            }
            fileName="bill.pdf"
            className="text-blue-700 underline"
          >
            {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Bill PDF')}
          </PDFDownloadLink>
        </div>
      )}

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default GenerateBill;
