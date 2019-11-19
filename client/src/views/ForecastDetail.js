import React, {Component} from 'react';
import API from '../utils/API';
import forecastModel from '../utils/forecastingModel';
import NavBar from '../components/NavBar';
import './style.css';

import { Table, Button, Container, Col, Form } from 'react-bootstrap';


class ForecastDetail extends Component {
    constructor(props) {
        super(props);

    this.state = {
        unitsOrder: '',
        totalOrder: '',
        masterCarton: '',
        salesGrowth: '',
        leadTime: '',
        orderAmount: '',
        selectedProduct: '',
        products: []
        }
    }

    // retrieve the products in the database
    componentDidMount() {
        API.getAllProducts()
            .then((dbResponse) => {
                let dbData = []
                dbResponse.data.map((row) => {
                    dbData.push({product_id: row.product_id, sku: row.product_sku});
            });
            this.setState({products: dbData});
            
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    // run forecast model and use output to determine the order quantity
    submitAssumptions = (e) => {
        e.preventDefault();

        if(parseFloat(this.state.unitsOrder) >= 0 && parseFloat(this.state.totalOrder) >= 0 && parseFloat(this.state.masterCarton) >= 0) {
            let output = forecastModel.forecastOutput(
                parseFloat(this.state.unitsOrder), 
                parseFloat(this.state.totalOrder), 
                parseFloat(this.state.masterCarton)
            );

            let product = document.getElementById('products');
        
            this.setState(
                {
                    orderAmount: output, 
                    selectedProduct: product.options[product.selectedIndex].id
                }, 
                () => {
                    API.getProduct(this.state.selectedProduct).then((apiResponse)=> {
                        if(apiResponse.data) {
                            if(apiResponse.data.quantity > this.state.orderAmount) {
                                this.setState({orderAmount: 0})
                            }
                            else {
                                this.setState({orderAmount: (this.state.orderAmount - apiResponse.data.quantity)});
                            }
                        }
                    });
                });
        }
        else {
            this.setState({orderAmount: "Please enter valid number"});
        }
    }

    render() {
        const isEnabled = this.state.unitsOrder > 0 && this.state.totalOrder > 0 && this.state.masterCarton > 0;
        // if(this.props.session) {
        return(
            <div>
            <NavBar />
            <br />
            <Col md={{ span: 4, offset: 4 }}>
                <h2 className= "h2">Forecast Calculator</h2>
            </Col>
            <br />
            <Container >
                <Table striped bordered hover size="sm" className="forecast-table-header">
                    <thead>
                        <tr>
                        <th>Product SKU</th>
                        <th>Units Order</th>
                        <th>Total Order</th>
                        <th>Master Carton</th>
                        <th>Sales Growth</th>
                        <th>Lead Time</th>
                        <th>Order Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>    
                            {this.state.products.length ? (
                                <select id="products">
                                {this.state.products.map((product, index) => 
                                    <option key={index} value={product} id={product.product_id}>{product.sku}</option>
                                )}
                                </select>
                            ) : (<strong>No options</strong>)}
                        </td>

                        <td>
                            <input type="text" name="unitsOrder"placeholder="Units Ordered" onChange={this.handleChange}></input>
                        </td>
                        <td>
                            <input type="text" name="totalOrder"placeholder="Total Orders" onChange={this.handleChange}></input>
                        </td>
                        <td>
                            <input type="text" name="masterCarton" placeholder="Master Carton" onChange={this.handleChange}></input>
                        </td>
                        <td>
                            <input type="text" name="salesGrowth" placeholder="Sales Growth" onChange={this.handleChange}></input>
                        </td>
                        <td>
                            <input type="text" name="leadTime" placeholder="Lead Time" onChange={this.handleChange}></input>
                        </td>
                        {this.state.orderAmount > 0 ?
                        <td  className="alert-info" onClick={() => alert('Order now!')}>    
                            <strong>{this.state.orderAmount}</strong> 
                        </td> 
                        : <td><strong>{this.state.orderAmount}</strong></td>}

                        </tr>
                    </tbody>
                </Table>
                <Button className= "button" disabled={!isEnabled} variant="primary" onClick={this.submitAssumptions}>Calculate</Button>
            </Container>
            </div>
        )
    }
    // else {
    //     return <div><h2>Unauthorized Access</h2></div>
    // }
// }
}

export default ForecastDetail;