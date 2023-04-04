import { Td, Tr } from "@chakra-ui/react";
import React from "react";

const PortfolioTable = ({
  company_id,
  company_name,
  quantity,
  handleRemove,
}) => {
  return (
    <Tr key={company_id}>
      <Td>{company_name}</Td>
      <Td>{quantity}</Td>
      <Td
        style={{ backgroundColor: "red", width: "100px" }}
        cursor="pointer"
        onClick={() => handleRemove(company_id)}
      >
        Remove Stock
      </Td>
    </Tr>
  );
};

export default PortfolioTable;
