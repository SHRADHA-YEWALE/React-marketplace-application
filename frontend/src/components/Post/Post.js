import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Store.js'
import axios from 'axios';
import endPointObj from '../../endPointUrl.js';
import { Form, Col, Row, Button, Card, Modal, Alert } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar.js";
import "../../App.css";

//Add post page component is implemented with Functional Component with react hooks along with context to manage global state. 
function Post() {

    //itemId -> Current state , setItemId -> Function to set current set.
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [itemImage, setItemImage] = useState();
    const [fileText, setFileText] = useState('Choose file...');
    const [file, setFile] = useState('');
    const [alert, setAlert] = useState('');
    const [showModal, setModal] = useState(false);

    /*Import the context from the Store.js file and provide it to to React’s useContext() hook as an argument to get
    access to the state object and the dispatch method in the component */
    const [state, dispatch] = useContext(Context);

    const addItem = (e) => {
        e.preventDefault();
        axios.post(endPointObj.url + "/marketplace/addProduct", {
            itemName: itemName,
            itemDescription: itemDescription,
            price: price,
            location: location,
            contact: contact
        })
            .then((response) => {
                const postsData = response.data;
                console.log("Product list after adding item", postsData);
                setItemId(postsData.itemId);
                setAlert(<Alert variant="success">Item Successfully Added!</Alert>);
                //Dispatching an action along with response payload to the store.
                dispatch({ type: 'ADD_POST', payload: postsData });
            })
            .catch((error) => {
                console.log('error');
                if (error.response && error.response.data) {
                    setAlert(error);
                }
                dispatch({ type: 'SET_ERROR', payload: error });
            });
    }

    let posts = null;

    //Accessing the store to map the data into our component’s
    if (!state.error && state.posts) {

        posts = state.posts.map(post => {
            return (

                <h3><b><label style={{ paddingRight: "2em", width: "20em", color: "#76b900" }} >
                    Item Id: {post.itemId}<br /><br />
                    Item Name: {post.itemName} <br /><br />
                    Item Description: {post.itemDescription} <br /><br />
                    Item Price: {post, price} <br /><br />
                    Address: {post.location} <br /><br />
                    Contact: {post.contact} </label><br /><br /></b>
                </h3>


            );

        });
    }

    const onUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("files", file);
        console.log("item id", itemId);
        formData.append("itemimage", file);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        axios.post(endPointObj.url + '/marketplace/uploads/item/' + itemId, formData, uploadConfig)
            .then(response => {
                setFileText("Choose file...");
                setItemImage(response.data);
            })
            .catch(err => {
                console.log("Error", err);
            });
    }

    const openModal = () => {
        setModal(true);

    };

    const onClose = (e) => {
        setModal(false);
    }


    return (
        <div><NavigationBar />
            <table>
                <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>
                        <div className="postContainer">
                            <Row>
                                <Col xs={6} md={6}>
                                    <center>

                                        <h2 className="commonTextLabel" style={{ paddingRight: "2em", width: "20em" }}><b>Add New Product Item</b></h2><br /> <br />
                                        <Form onSubmit={addItem}>
                                            <Form.Group as={Row} controlId="item_name" className="textLabel">
                                                <Form.Label column sm="4">
                                                    Item Name:
                                                </Form.Label>
                                                <Col sm="4">
                                                    <Form.Control style={{ width: "25rem", height: "3rem" }}
                                                        type="text" name="item_name"
                                                        placeholder="Enter item name"
                                                        onChange={(e) => {
                                                            setItemName(e.target.value);
                                                        }}
                                                        required />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="item_description" className="textLabel">
                                                <Form.Label column sm="4">
                                                    Item Description:
                                                </Form.Label>
                                                <Col sm="4">
                                                    <Form.Control style={{ width: "25rem", height: "3rem" }}
                                                        type="text" name="item_description"
                                                        placeholder="Enter item description"
                                                        onChange={(e) => {
                                                            setItemDescription(e.target.value);
                                                        }}
                                                        required />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="item_price" className="textLabel">
                                                <Form.Label column sm="4">Price: </Form.Label>
                                                <Col sm="4">
                                                    <Form.Control style={{ width: "25rem", height: "3rem" }}
                                                        type="number" step="any" name="item_price"
                                                        placeholder="Enter item price"
                                                        onChange={(e) => {
                                                            setPrice(e.target.value);
                                                        }}
                                                        required />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="item_location" className="textLabel">
                                                <Form.Label column sm="4">Address:</Form.Label>
                                                <Col sm="4">
                                                    <Form.Control style={{ width: "25rem", height: "3rem" }}
                                                        type="text" name="item_location"
                                                        placeholder="Enter item location"
                                                        onChange={(e) => {
                                                            setLocation(e.target.value);
                                                        }}
                                                        required />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="item_contact" className="textLabel">
                                                <Form.Label column sm="4">Contact:</Form.Label>
                                                <Col sm="4">
                                                    <Form.Control style={{ width: "25rem", height: "3rem" }}
                                                        type="number"
                                                        name="item_price"
                                                        placeholder="Enter contact number"
                                                        onChange={(e) => {
                                                            setContact(e.target.value);
                                                        }}
                                                        required />
                                                </Col>
                                            </Form.Group><br />

                                            <div style={{ paddingLeft: "15em" }}>
                                                <center>
                                                    <Button type="sumbit" className="submitButton">Add Item</Button>
                                                    <br /><br />
                                                    <div style={{ width: "20em" }}>{alert}</div>
                                                    <hr />
                                                    <Button variant="primary" onClick={openModal} name="viewImages" className="submitButton">Upload Product Images</Button>

                                                </center>
                                            </div>
                                        </Form>
                                    </center>
                                </Col>
                            </Row>
                        </div>

                        <div id="myModal" className="Modal is-hidden">
                            <Modal show={showModal} onHide={onClose}>
                                <Modal.Body>
                                    <center>
                                        <br /><br />
                                        <h3 className="commonTextLabel">Upload Item Image</h3><br />

                                        <Card style={{ width: '12rem', height: '12rem' }}>
                                            <Card.Img variant="top" style={{ width: '12rem', height: '12rem' }} src={endPointObj.url + '/images/product/' + itemImage} />
                                        </Card><br /><br />
                                        <form onSubmit={onUpload}><br />
                                            <div class="custom-file" style={{ width: "80%" }}>
                                                <input type="file" class="custom-file-input" name="image" accept="image/*"
                                                    onChange={(e) => {
                                                        setFileText(e.target.files[0].name);
                                                        setFile(e.target.files[0]);
                                                    }}
                                                    required />
                                                <label class="custom-file-label" for="image" style={{ "text-align": "left" }}>{fileText}</label>
                                            </div><br /><br />
                                            <Button type="submit" className="submitButton">Upload</Button>
                                        </form>
                                    </center>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" className="Close" onClick={onClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </td>
                    <td><div className="ItemAddedContainer">
                        <Card style={{ width: "30rem", height: "40rem", margin: "1%", backgroundColor: "#ffffff", }}>
                            <Card.Title><h2 className="commonTextLabel" style={{ paddingLeft: "3em", width: "30em" }}><b>Product Item Added</b></h2><br /> <br /> </Card.Title>
                            <Card.Body>
                                {posts}
                            </Card.Body>
                        </Card>
                    </div>
                    </td>
                </tr>
            </table>
        </div>


    )
}

export default Post;