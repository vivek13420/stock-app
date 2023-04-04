import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyStock, fetchUser } from "../Redux/UserReducer/action";

const initialQuantityArray = new Array(4).fill("");

const Stocks = () => {
  const userId = useSelector((store) => store.LoginReducer.userId);
  const userReducer = useSelector((store) => store.userReducer);

  const [stocks, setStocks] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(initialQuantityArray);

  const getData = async () => {
    try {
      const params = {
        _page: page || 1,
        _limit: 4,
      };

      if (sortBy) {
        params["_sort"] = "cost_per_share";
        params["_order"] = sortBy;
      }

      if (type) {
        params["company_type"] = type;
      }

      const response = await axios.get("https://stock-json-server.onrender.com/companies", {
        params,
      });

      // console.log(response.data);
      setStocks(response.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get data");
    }
  };

  const handleTypeChange = (e) => {
    // console.log(e.target.value)
    setType(e.target.value);
  };

  const handlePageChange = (val) => {
    setPage((prev) => prev + val);
    setQuantity(initialQuantityArray);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setType("");
    setSortBy("");
  };

  const handleQuantityChange = (index, val) => {
    const newQuantity = [...quantity];
    newQuantity[index] = +val;
    setQuantity(newQuantity);
  };

  const handleBuyButton = (index, stockID, company_name) => {
    if (quantity[index] == undefined) return;
    // console.log(quantity[index]);
    let newStocksOwned = [...userReducer.stocks_owned];
    const stockFound = newStocksOwned.find(
      (item) => item.company_id == stockID
    );

    if (stockFound) {
      newStocksOwned = newStocksOwned.map((item) => {
        if (item.company_id == stockID) {
          return {
            ...item,
            company_name: company_name,
            quantity: item.quantity + quantity[index],
          };
        } else {
          return item;
        }
      });
    } else {
      newStocksOwned = [
        ...newStocksOwned,
        {
          company_id: stockID,
          company_name: company_name,
          quantity: quantity[index],
        },
      ];
    }

    userReducer.stocks_owned = newStocksOwned;

    dispatch(buyStock(userId, userReducer));
  };

  useEffect(() => {
    getData();
  }, [type, page, sortBy]);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);
  return (
    <>
      <select value={type} onChange={handleTypeChange} name="" id="select">
        <option value="">Choose Company Type</option>
        <option value="Bank">Bank</option>
        <option value="IT">IT</option>
        <option value="Automobile">Automobile</option>
        <option value="Pharma">Pharma</option>
        <option value="Oil">Oil</option>
      </select>
      <Button isDisabled={page == 1} onClick={() => handlePageChange(-1)}>
        Prev
      </Button>
      <Button
        isDisabled={stocks.length < 4}
        onClick={() => handlePageChange(1)}
      >
        Next
      </Button>
      <select value={sortBy} onChange={handleSortChange} name="" id="">
        <option value="">Sort by Cost per Share</option>
        <option value="asc">Low to High</option>
        <option value="desc">High To Low</option>
      </select>
      <Button onClick={handleClearFilters}>Clear Filters</Button>
      <div className="stocks-div">
        {stocks &&
          stocks.map((stock, index) => (
            <div className="stock" key={stock.id}>
              <img src={stock.company_logo} width="200px" alt="" />
              <p>Name: {stock.company_name} </p>
              <p>Type: {stock.company_type} </p>
              <p>Stock-Exchange: {stock.stock_exchange} </p>
              <p>Total Shares: {stock.total_shares} </p>
              <p>Cpst per share: {stock.cost_per_share} </p>
              <p>Price Action: {stock.price_action} </p>
              <Input
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                value={quantity[index] || ""}
                width="100px"
                type="number"
                placeholder="Quantity"
              />
              <Button
                onClick={() =>
                  handleBuyButton(index, stock.id, stock.company_name)
                }
                colorScheme="red"
              >
                Buy
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Stocks;
