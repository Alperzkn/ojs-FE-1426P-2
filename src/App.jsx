import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  // eslint-disable-next-line no-unused-vars
  FloatingLabel,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { categories } from "./Category";
import { shops } from "./Shop";
import JSConfetti from "js-confetti";
import { Filter } from "./Filter";

function App() {
  const [products, SetProduct] = useState([]);
  const [addedProductId, SetId] = useState(0);
  const [show, setShow] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [selectProductState, setProductState] = useState();

  const [filteredShopId, setFilteredShopId] = useState();
  const [filteredCategoryId, setFilteredCategoryId] = useState();
  const [filteredStatus, setFilteredStatus] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEmptyClose = () => setShowEmpty(false);
  const handleEmptyShow = () => setShowEmpty(true);
  const jsConfetti = new JSConfetti();

  const handleProductChange = (filteredProductId) => {
    setFilteredStatus(filteredProductId);
    if (filteredProductId == 2) {
      const filteredProductsBought = products.filter(
        (product) => product.addedProductIsBought == true
      );
      console.log(filteredProductsBought);
      SetProduct(filteredProductsBought);
    } else if (filteredProductId == 3) {
      const filteredProductsNotBought = products.filter(
        (product) => product.addedProductIsBought == false
      );
      console.log(filteredProductsNotBought);
      SetProduct(filteredProductsNotBought);
    } else {
      SetProduct(...products);
    }
  };

  const handleProduct = (product) => {
    if (product.addedProductIsBought) {
      product.addedProductIsBought = false;
    } else {
      product.addedProductIsBought = true;
    }

    SetProduct([...products]);
    console.log(
      "addedProductIsBought = " + product.addedProductIsBought,
      product.addedProductName
    );

    const checkStatusOfProduct = (product) => {
      return product.addedProductIsBought === true;
    };

    if (products.length != 0) {
      if (products.every(checkStatusOfProduct)) {
        handleShow();
        jsConfetti.addConfetti();
        //alert("Shopping completed!");
      }
    }
  };

  const deleteProduct = (product) => {
    const idOfDeletedProduct = product.addedProductId;
    const updatedProducts = products.filter(
      (product) => product.addedProductId !== idOfDeletedProduct
    );
    SetProduct(updatedProducts);
    //console.log(products);
    //console.log(idOfDeletedProduct);
    //console.log(updatedProducts);
  };

  const addProduct = (event) => {
    event.preventDefault();
    const productInputValue = event.target.productNameInput.value;
    const productShop = event.target.shopInput.value;
    const productCategory = event.target.categoryInput.value;
    if (productInputValue.trim().length !== 0) {
      SetId(addedProductId + 1);

      const addedProduct = {
        addedProductName: productInputValue,
        addedProductShop: productShop,
        addedProductCategory: productCategory,
        addedProductId,
        addedProductIsBought: false,
      };

      SetProduct([...products, addedProduct]);
    } else {
      handleEmptyShow();

      //alert("Product name cannot be empty!");
    }
  };
  console.log("products = " + products);
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            Shopping completed!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We hope you enjoyed shopping with us. Wish to see you again..
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEmpty} onHide={handleEmptyClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-warning">
            Product name cannot be empty!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEmptyClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="my-5">
        <h1 className="text-center">OnlyJS FE-1426P-1</h1>
        <h1>{filteredStatus}</h1>
      </Container>
      <Container>
        <Row>
          <Col className="shadow me-2" xl={4} xs={12}>
            <Form onSubmit={addProduct} className="p-3">
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="productNameInput"
                  placeholder="Enter product name"
                  id="productNameInput"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Select Shop</Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  name="shopInput"
                  id="shopInput"
                >
                  {shops.map((opt, key) => (
                    <option value={opt.name} key={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Category</Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  name="categoryInput"
                  id="categoryInput"
                >
                  {categories.map((opt, key) => (
                    <option value={opt.name} key={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col className="p-3 shadow">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Bought from</th>
                  <th>Product Category</th>
                </tr>
              </thead>
              <thead className="align-middle">
                {/* Filter section */}
                <Filter onProductsChange={handleProductChange} />
              </thead>
              <tbody>
                {products.map((product, key) => (
                  <tr
                    key={key}
                    className={
                      "align-middle " +
                      (product.addedProductIsBought
                        ? "table-success"
                        : "table-warning")
                    }
                  >
                    <td>{product.addedProductId}</td>
                    <td>{product.addedProductName}</td>
                    <td>{product.addedProductShop}</td>
                    <td>{product.addedProductCategory}</td>
                    <td className="text-center">
                      <Button
                        onClick={() => handleProduct(product)}
                        className={
                          "btn fw-bolder mx-1 " +
                          (product.addedProductIsBought
                            ? " btn-success"
                            : " btn-warning px-4")
                        }
                      >
                        {product.addedProductIsBought ? "Bought" : "Buy"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn-sm btn-danger mx-1"
                        onClick={() => deleteProduct(product)}
                      >
                        x
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
