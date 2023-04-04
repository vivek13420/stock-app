import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

import { useDispatch, useSelector } from "react-redux";
import { removeStock } from "../Redux/UserReducer/action";
import PortfolioTable from "../components/PortfolioTable";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  const userId = useSelector((store) => store.LoginReducer.userId);
  const userReducer = useSelector((store) => store.userReducer);
  // const [names, setNames] = useState([]);
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: userReducer.stocks_owned.map((item) => item.company_name),
    datasets: [
      {
        label: "Quantity",
        data: userReducer.stocks_owned.map((item) => item.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  });
  // console.log(chartData)
  // console.log({} == true);

  const refreshChart = () => [
    setChartData({
      labels: userReducer.stocks_owned.map((item) => item.company_name),
      datasets: [
        {
          label: "Quantity",
          data: userReducer.stocks_owned.map((item) => item.quantity),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        },
      ],
    }),
  ];

  // const getNames = async () => {
  //   let names = await Promise.all(
  //     userReducer.stocks_owned.map(async (stock) => {
  //       const res = await axios.get(
  //         `http://localhost:3000/companies/${stock.company_id}`
  //       );
  //       return res.data.company_name;
  //     })
  //   );
  //   setNames(names);
  // };

  const handleRemove = (stockID) => {
    let newStocksOwned = [...userReducer.stocks_owned];

    newStocksOwned = newStocksOwned.filter(
      (stock) => stock.company_id != stockID
    );

    console.log(newStocksOwned);

    userReducer.stocks_owned = newStocksOwned;

    dispatch(removeStock(userId, userReducer));
    refreshChart();
  };

  // useEffect(() => {
  //   refreshChart();
  // }, []);

  return (
    <div>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Company Name</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userReducer.stocks_owned.map((stock, i) => {
              return (
                <PortfolioTable
                  company_id={stock.company_id}
                  company_name={stock.company_name}
                  quantity={stock.quantity}
                  handleRemove={handleRemove}
                />
                // <Tr key={stock.company_id}>
                //   <Td>{stock.company_name}</Td>
                //   <Td>{stock.quantity}</Td>
                //   <Td
                //     style={{ backgroundColor: "red", width: "100px" }}
                //     cursor="pointer"
                //     onClick={() => handleRemove(stock.company_id)}
                //   >
                //     Remove Stock
                //   </Td>
                // </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pie data={chartData} />
    </div>
  );
};

export default Portfolio;
