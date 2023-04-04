import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

function Modal({ onClose, modalData, getData }) {
  const [formState, setFormState] = useState(modalData);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`https://stock-json-server.onrender.com/companies/${modalData.id}`, formState)
      .then(() => {
        alert("Company edited successfully!");
        // setFormState(initialState);
        onClose();
        getData();
      })
      .catch(() => {
        alert("Error adding company");
      });
  };
  return (
    <div className="modal">
      <div onClick={onClose} className="modal-backdrop"></div>
      <div className="modal-container">
        <Button onClick={onClose}>X</Button>
        <Stack spacing={6} mt={10} mx="auto" maxW="500px">
          <form onSubmit={handleSubmit}>
            <FormControl id="companyLogo">
              <FormLabel>Company Logo</FormLabel>
              <Input
                name="company_logo"
                value={formState.company_logo}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="company_name">
              <FormLabel>Company Name</FormLabel>
              <Input
                name="company_name"
                value={formState.company_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="company_type">
              <FormLabel>Company Type</FormLabel>
              <Select
                name="company_type"
                value={formState.company_type}
                onChange={handleInputChange}
              >
                <option value="Bank">Bank</option>
                <option value="IT">IT</option>
                <option value="Automobile">Automobile</option>
                <option value="Pharma">Pharma</option>
                <option value="Oil">Oil</option>
              </Select>
            </FormControl>
            <FormControl id="stock_exchange">
              <FormLabel>Stock Exchange</FormLabel>
              <Select
                name="stock_exchange"
                value={formState.stock_exchange}
                onChange={handleInputChange}
              >
                <option value="NSE">NSE</option>
                <option value="BSE">BSE</option>
              </Select>
            </FormControl>
            <FormControl id="total_shares">
              <FormLabel>Total Shares</FormLabel>
              <Input
                type="number"
                name="total_shares"
                value={formState.total_shares}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="cost_per_share">
              <FormLabel>Cost Per Share</FormLabel>
              <Input
                type="number"
                name="cost_per_share"
                value={formState.cost_per_share}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="price_action">
              <FormLabel>Price Action</FormLabel>
              <Input
                type="number"
                name="price_action"
                value={formState.price_action}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </form>
        </Stack>
        {/* modal content goes here */}
      </div>
    </div>
  );
}

export default Modal;
