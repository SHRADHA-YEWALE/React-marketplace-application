import React, { Component } from 'react';
import { Button, Card, Modal, Col, Row, Alert } from 'react-bootstrap';
import endPointObj from '../../endPointUrl.js';
import "./Product.css";
import NavigationBar from "../Navbar/Navbar.js";

//Product Details page implemented as Class Component.
var images = [], renderedOutput = null, noRecordMessage = null;
class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.setState({
            productDetails: "",
            showModal: false,

        });
        this.openModal = this.openModal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.showImages = this.showImages.bind(this);
    }

    showImages = (e) => {
        console.log("Inside show images");
        renderedOutput = this.state.images.map(item =>

            <div class="images_preview" style={{ marginBottom: '15px' }}>
                <img src={endPointObj.url + '/images/product/' + item.file_name} style={{ width: '80px' }} alt="im" />

            </div>
        )
    }

    openModal = () => {
        this.setState({
            showModal: true
        });
    };

    onClose = (e) => {
        this.setState({
            showModal: false
        });
    }


    render() {
        let itemImageSrc = null,
            itemName, itemDescription, price, location, contact, item_image,
            item = this.props.location.state;
        let showModal = false;
        let buttonClick = this.openModal;
        var imageCards = null;
        console.log("Item details:", item);

        if (item) {
            itemImageSrc = endPointObj.url + "/images/product/" + item.item_image;
            itemName = item.itemName;
            itemDescription = item.itemDescription;
            price = item.price;
            location = item.location;
            contact = item.contact;
            images = item.images;
        }

        if (this.state && this.state.noRecord) {
            noRecordMessage = (
                <Alert variant="warning">
                    Product description is not available at this time!
                </Alert>
            );
        }

        if (this.state) {
            showModal = this.state.showModal;
        }

        imageCards = images.map(item => {
            return (
                <Col md={6}>
                    <img src={endPointObj.url + '/images/product/' + item.file_name} style={{ width: '200px', height: '200px', margin: "5%" }} alt="im" loading="lazy" />
                    &nbsp;&nbsp;
                </Col>

            );
        })


        return (
            <div>
                <NavigationBar />
                <div className="productContainer">
                    <table>
                        <tr>
                            <td>
                                <Card style={{ width: "40rem", height: "38rem", margin: "2%", backgroundColor: "#ffffff", paddingRight: "0em" }}>
                                    <Col md={12}>
                                        <Row >
                                            <Card.Img style={{ width: "40rem", height: "38rem" }} src={itemImageSrc} className="img-thumbnail" />
                                        </Row>
                                    </Col>
                                </Card>
                            </td>
                            <td>
                                <Card style={{ width: "45rem", height: "38rem", margin: "2%", backgroundColor: "#ffffff", paddingRight: "0em" }}>

                                    <Col md={12}>

                                        <Row >
                                            <Card.Body>
                                                <Card.Title><h2 className="productdetailsTitle"><b>{itemName}</b></h2></Card.Title>
                                                <hr />
                                                <Card.Text className="productdetailsDescription"><b>{itemDescription}</b> </Card.Text>
                                                <br />
                                                <Card.Text className="productdetailsDescription" style={{ fontSize: "30px", color: "#76b900" }}><b><u>Price</u>: ${price}</b></Card.Text>
                                                <br />
                                                <Card.Text className="productdetailsDescription"><b><u>Seller Information</u></b></Card.Text>

                                                <Card.Text className="productdetailsDescription">
                                                    <li>Address: {location} </li>
                                                    <li>Contact Number: {contact}</li>
                                                </Card.Text>
                                            </Card.Body>
                                        </Row>
                                    </Col>
                                    <center>
                                        <Button variant="primary" onClick={buttonClick} name="viewImages" className="submitButton">View Images</Button>
                                    </center>

                                </Card>
                            </td></tr>
                    </table>



                    <div id="myModal" className="Modal is-hidden">
                        <Modal show={showModal} onHide={this.onClose}>
                            <Modal.Body>
                                <center>
                                    <Row md="3">{imageCards}</Row>
                                </center>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" className="CloseButton" onClick={this.onClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <br />
                </div>
            </div>
        )
    }
}
export default ProductDetails;
