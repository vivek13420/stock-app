import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import Modal from "../components/Modal";

let initialState = {
  company_logo: "",
  company_name: "",
  company_type: "",
  stock_exchange: "",
  total_shares: "",
  cost_per_share: "",
  price_action: "",
};

const Dashboard = () => {
  const [formState, setFormState] = useState(initialState);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://stock-json-server.onrender.com/companies", formState)
      .then(() => {
        alert("Company added successfully!");
        setFormState(initialState);
        getData();
      })
      .catch(() => {
        alert("Error adding company");
      });
  };

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let res = await axios.get("https://stock-json-server.onrender.com/companies");
    // console.log(res.data)
    setTableData(res.data);
    console.log(tableData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleShowModal = (item) => {
    setShowModal(true);
    setModalData(item);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://stock-json-server.onrender.com/companies/${id}`);
    alert("company deleted");
    getData();
  };

  return (
    <>
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
          <Button type="submit">List Stock</Button>
        </form>
      </Stack>
      {showModal && (
        <Modal
          onClose={handleHideModal}
          modalData={modalData}
          getData={getData}
        />
      )}
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Company logo</Th>
              <Th>Company name</Th>
              <Th>Company Type</Th>
              <Th>Stock Exchange</Th>
              <Th>Total shares</Th>
              <Th>Cost per share</Th>
              <Th>Price action</Th>
              <Th>Edit Stock </Th>
              <Th>Delete Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item) => (
              <Tr>
                <Td>
                  <Image src={item.company_logo} />
                </Td>
                <Td>{item.company_name}</Td>
                <Td>{item.company_type}</Td>
                <Td>{item.stock_exchange}</Td>
                <Td>{item.total_shares}</Td>
                <Td>{item.cost_per_share}</Td>
                <Td>{item.price_action}</Td>
                <Td>
                  <Button onClick={() => handleShowModal(item)}>Edit</Button>
                </Td>
                <Td>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;
