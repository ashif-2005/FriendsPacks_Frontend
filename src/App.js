import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";

function App() {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gstno, setGstno] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [poDate, setPoDate] = useState(dayjs());
  const [invoiceDate, setInvoiceDate] = useState(dayjs());
  const [transport, setTransport] = useState(""); // New State
  const [place, setPlace] = useState(""); // New State
  const [items, setItems] = useState([
    { hsnCode: "", dcNumber: "", name: "", quantity: "", price: "" },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  const formatDate = (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "");

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { hsnCode: "", dcNumber: "", name: "", quantity: "", price: "" },
    ]);
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) =>
        sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0),
      0
    );
    setTotalAmount(total);
  };

  const handlePrint = async () => {
    window.location.href = "https://friendspacks-backend.onrender.com/api/print";
  };

  const handleSet = async () => {
    try {
      const response = await axios.post("https://friendspacks-backend.onrender.com/api/invoice", {
        companyName,
        address,
        city,
        state,
        gstno,
        stateCode,
        invoiceNo,
        poNumber,
        poDate: formatDate(poDate),
        invoiceDate: formatDate(invoiceDate),
        transport, 
        place, 
        items,
        totalAmount,
      });
      alert("Data has been set to the invoice you can print now!!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to set data to invoice");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="md"
        sx={{
          marginTop: "30px",
          backgroundColor: "#FFFAEC",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Friends Packs
        </Typography>
        <Box component="form">
          <Grid container spacing={2}>
            {/* Existing Fields */}
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                fullWidth
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GST Number"
                fullWidth
                value={gstno}
                onChange={(e) => setGstno(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State Code"
                fullWidth
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Invoice Number"
                fullWidth
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="PO Number"
                fullWidth
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Invoice Date"
                value={invoiceDate}
                onChange={(newValue) => setInvoiceDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="PO Date"
                value={poDate}
                onChange={(newValue) => setPoDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth />
                )}
              />
            </Grid>

            {/* New Fields */}
            <Grid item xs={6}>
              <TextField
                label="Transport"
                fullWidth
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Place"
                fullWidth
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Items Section */}
          <Typography variant="h6" mt={3} gutterBottom>
            Items:
          </Typography>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <TextField
                label="HSN Code"
                value={item.hsnCode}
                onChange={(e) =>
                  handleItemChange(index, "hsnCode", e.target.value)
                }
              />
              <TextField
                label="DC Number"
                value={item.dcNumber}
                onChange={(e) =>
                  handleItemChange(index, "dcNumber", e.target.value)
                }
              />
              <TextField
                label="Item Name"
                fullWidth
                multiline
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
              />
              <TextField
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
              />
              <TextField
                label="Price"
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={addItem}
            sx={{ marginBottom: "20px" }}
          >
            Add Item
          </Button>
          <Typography variant="h6">Total Amount: {totalAmount.toFixed(2)}</Typography>
          <Button
            variant="contained"
            onClick={handleSet}
            sx={{
              backgroundColor: "green",
              color: "white",
              marginTop: "20px",
              marginRight: "20px",
              padding: "8px 16px",
              fontSize: "14px",
            }}
          >
            Set Content
          </Button>
          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{
              backgroundColor: "green",
              color: "white",
              marginTop: "20px",
              padding: "8px 16px",
              fontSize: "14px",
            }}
          >
            Print Invoice
          </Button>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
