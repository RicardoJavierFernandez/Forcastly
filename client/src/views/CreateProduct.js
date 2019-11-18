import React, { Component } from 'react';
import API from '../utils/API';

import NavBar from '../components/NavBar';

import { Container, Col, Form, Button } from 'react-bootstrap';


class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productGroup: [],
            selectedGroup: '',
            sku: '',
            asin: '',
            name: '',
            masterCarton: ''
        }
    }

    getProductGroups = () => {
        API.getAllProductGroups()
            .then((dbResponse) => {
                this.setState({productGroup: dbResponse.data});
            });
    }

    componentDidMount() {
        this.getProductGroups();
    }

    handleInputChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    }

    submitProduct = (e) => {
        e.preventDefault();

        let productGroup = document.getElementById('productGroupSelection');

        this.setState({selectedGroup: productGroup.options[productGroup.selectedIndex].id}, () => {
            if(!isNaN(parseInt(this.state.masterCarton))) {
                API.createProduct({
                    product_sku: this.state.sku,
                    product_asin: this.state.asin,
                    product_name: this.state.name,
                    master_carton: this.state.masterCarton,
                    product_group_id: this.state.selectedGroup
                })
                .then((dbResponse) => {
                    this.setState({
                        sku: '',
                        asin: '',
                        name: '',
                        masterCarton: '',
                        selectedGroup: ''
                    }, () => {
                        document.getElementById('sku').value = "";
                        document.getElementById('asin').value = "";
                        document.getElementById('name').value = "";
                        document.getElementById('masterCarton').value = "";
                    })
                })
            }
            // console.log(this.state.sku, this.state.asin, this.state.name, typeof(parseInt(this.state.masterCarton)), this.state.selectedGroup);
        });

    }

    render() {

        // isEnable boolean for the button
        const isEnabled = this.state.sku.length > 0 && this.state.asin.length > 0 && this.state.name.length > 0 && this.state.masterCarton.length > 0;

        return(
            <div>
            <NavBar />
            <br />
            <Container>
                <Col md={{ span: 4, offset: 4 }}>
                    <h2>Create Product</h2>
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Product Group</Form.Label>
                        <Form.Control as="select" id="productGroupSelection">
                            {this.state.productGroup.map((group, index) => 
                                <option 
                                    key={index} 
                                    value={group.group_name} 
                                    id={group.product_group_id}
                                >
                                    {group.group_name}
                                </option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control type="text" rows="1" name="sku" id= "sku" placeholder="Required Field" onChange={this.handleInputChange} />
                        <Form.Label>ASIN</Form.Label>
                        <Form.Control type="text" rows="1" name="asin" id="asin" placeholder="Required Field" onChange={this.handleInputChange} />
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" rows="1" name="name" id="name" placeholder="Required Field" onChange={this.handleInputChange} />
                        <Form.Label>Master Carton</Form.Label>
                        <Form.Control type="text" rows="1" name="masterCarton" id="masterCarton" placeholder="Required Field, must be a number" onChange={this.handleInputChange} />
                    </Form.Group>
                </Form>
                <Button disabled={!isEnabled} variant="primary" onClick={this.submitProduct}>Create Product</Button>
                </Col>
            </Container>
            </div>
        )
    }
}

export default CreateProduct;


