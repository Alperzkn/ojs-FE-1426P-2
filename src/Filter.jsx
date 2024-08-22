import { Form } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { shops } from "./Shop";
import { categories } from "./Category";
import { useState } from "react";

const productStatusTypes = [
  {
    id: 1,
    type: "all",
    name: "All",
  },
  {
    id: 2,
    name: "Bought",
    type: "bought",
  },
  {
    id: 3,
    name: "Not bought",
    type: "notBought",
  },
];
// eslint-disable-next-line no-unused-vars
export function Filter({ onProductsChange }) {
  const [filteredShop, setFilterShop] = useState(1);

  const onProductStatusChange = (e) => {
    console.log("target id = " + e.target.id);
    console.log("filtered shop value = " + filteredShop);
    const productType = e.target.id;
    setFilterShop(productType);
    onProductsChange(productType);
  };
  console.log("after changed filtered shop value = " + filteredShop);

  console.log("----------------------------------------------");
  return (
    <>
      <tr>
        <th></th>
        <th>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter product name"
            ></Form.Control>
          </Form.Group>
        </th>
        <th>
          <Form.Select aria-label="Default select example">
            <option>Select Shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
        </th>
        <th>
          <Form.Select aria-label="Default select example">
            <option>Select Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </th>
        <th>
          <Form>
            {productStatusTypes.map((type, key) => (
              <Form.Check
                key={key}
                className="mb-3"
                type="radio"
                id={type.id}
                label={type.name}
                name="productStatus"
                value={filteredShop}
                onChange={onProductStatusChange}
              />
            ))}
          </Form>
        </th>
      </tr>
    </>
  );
}
