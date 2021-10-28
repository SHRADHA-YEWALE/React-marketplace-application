import React, { Component } from 'react';
import axios from 'axios';
import endPointObj from '../../endPointUrl.js';
import ProductCard from "../Product/ProductCard.js";
import { InputGroup, FormControl, Button, Form, Alert, Col, Row, FormLabel } from 'react-bootstrap';
import "./Home.css";
import NavigationBar from "../Navbar/Navbar.js";

// Implemeted Home page component with Class Component
class Home extends Component {
    constructor(props) {
        super(props);
        this.setState({
            search_input: "",
        });

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        console.log("Mounting the component");
        axios.get(endPointObj.url + "/marketplace/getProducts")
            .then(response => {
                if (response.data) {
                    console.log("Get products response", response.data);
                    this.setState({
                        postsList: response.data,
                        displayPosts: response.data
                    });
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log(error.response.data);
                }
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            noRecord: false
        });
    }

    onSearch = (e) => {
        console.log("Onsearch");
        e.preventDefault();

        if (this.state) {

            var searchInput = typeof this.state.search_input === "undefined" || this.state.search_input === "" ? "_" : this.state.search_input;
            let data = {
                searchInput: searchInput,
                price: this.state.price
            }

            axios.post(endPointObj.url + "/marketplace/productSearch", data)
                .then(response => {
                    if (response.data) {
                        if (response.data === 'ITEM_NOT_FOUND') {
                            this.setState({
                                noRecord: true,
                                search_input: searchInput
                            });
                        }
                        else {
                            this.setState({
                                postsList: response.data,
                                displayPosts: response.data,
                                noRecord: false
                            });
                        }
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                    }
                })
        }
    }


    render() {
        var postCards = null,
            noRecordMessage = null;

        // Displaying all ad posts on page  
        if (this.state && this.state.displayPosts) {
            postCards = this.state.displayPosts.map(posts => {
                return (
                    <Col md={3}>
                        <ProductCard product={posts} />
                    </Col>
                );
            });
        }

        if (this.state && this.state.noRecord) {
            noRecordMessage = (
                <Alert variant="warning">
                    Sorry,Item you have searched is not available!
                </Alert>
            );
        }
        else {
            noRecordMessage = null;
        }

        return (
            <div>
                <div> <NavigationBar /> </div>
                <center><br /><br /><br />                    
                    <div><br /><br />

                        <Form onSubmit={this.onSearch}>
                            <InputGroup style={{ width: '50%', height: '100%', paddingTop: '0em' }} size="lg">
                                <FormControl
                                    style={{ width: '50%' }}
                                    placeholder="Search for your favourite products"
                                    aria-label="Search products"
                                    aria-describedby="basic-addon2"
                                    name="search_input"
                                    className="searchInputField"
                                    onChange={this.onChange}
                                    required /> &nbsp;&nbsp;&nbsp;&nbsp;

                                <div>
                                    <select className="custom-select"
                                        style={{ width: '90%', height: '68%' }}
                                        name="price" onChange={this.onChange}>
                                        <option>Price</option>
                                        <option value="0">$0 - $25</option>
                                        <option value="1">$25 - $100</option>
                                        <option value="2">$100 - $500</option>
                                        <option value="3">$500 - $1000</option>

                                    </select>
                                </div>

                                <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <center><Button type="submit" className="submitButton">Search</Button></center>

                            </InputGroup>
                        </Form>
                    </div>

                    <div className="welcomeTitle">
                    </div>
                    <br /><br />
                    {noRecordMessage}
                    <Row md="6">{postCards}</Row>

                </center>
            </div>
        )
    }
}

export default Home;
