import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import endPointObj from '../../endPointUrl.js';
import './Product.css';

//It contains the implementation of ad post card which is displaying on home page
class PostCard extends Component {

  render() {

    var productData = this.props.product;
    let imageSrc = endPointObj.url + "/images/product/" + this.props.product.item_image;
    return (
      <Card bg="white" style={{ width: "20rem", margin: "5%" }}>
        <Link to={{ pathname: '/product', state: productData }}>
          <Card.Body>
            <Card.Img
              className="img-thumbnail"
              style={{ width: "18rem", height: "15em" }}
              src={imageSrc}
            />
            <hr />
            <Card.Title className="productCardTitle"><b>{this.props.product.itemName}</b></Card.Title>
            <Card.Text className="productDescription"><b>{this.props.product.location}</b></Card.Text>
          </Card.Body>
        </Link>

      </Card>
    );
  }
}

export default PostCard;