import React, { Component } from 'react';
import NavBar from '../components/NavBar';

import {Container, Col, Row, Table} from 'react-bootstrap/';

import Chart from 'react-apexcharts';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
              colors: ['#3fc5f0'],
              chart: {
                id: "basic-bar"
              },
              title: {
                text: 'Sales Per Month',
                align: 'center'
              },
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              },
              yaxis: {
                title: {
                  text: 'Sales $ (thousands)'
                }
            }
        },
            series: [
              {
                name: "Sales",
                data: [76, 67, 58, 55, 50, 60, 70, 91, 86, 82, 91, 95]
              }
            ],
            options2: {
                labels: ['Electrical', 'Grip', 'Gaffe', 'Masking'],
                title: {
                    text: 'Inventory by Group',
                    align: 'center'
                },
                responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                    width: 0
                    },
                    legend: {
                    position: 'bottom'
                    }
                }
                }]
            },
            series2: [44, 55, 13, 43]
        }
}

    render() {

        if (this.props.session) {
        return(
            <div>
            <NavBar />
            <Container>
                <Col md={{ span: 4, offset: 4 }}>
                    <br />
                    <h2>Dashboard</h2>
                    <br />
                </Col>

                <br />

                <Row>
                    
                {/* Pie chart */}
                <Col md={{span: 6, offset: 0}}>
                    <div id="chart">
                        <Chart 
                            options={this.state.options2} 
                            series={this.state.series2} 
                            type="pie" 
                            width="410" 
                        />
                    </div>
                </Col>

                {/* Line chart */}
                <Col md={{ span: 6, offset: 0 }}>
                    <div className="chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="500"
                        />
                    </div>
                </Col>
                </Row>
                
                <br />

                <Col md={{ span: 4, offset: 4 }}>
                    <h3>Top 5 Revenue</h3>
                </Col>
                <Table striped bordered responsive="sm" size="sm">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Sales</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Product 1</td>
                        <td>$8,000</td>
                    </tr>
                    <tr>
                        <td>Product 2</td>
                        <td>$6,000</td>
                    </tr>
                    <tr>
                        <td>Product 3</td>
                        <td>$5,040</td>
                    </tr>
                    <tr>
                        <td>Product 4</td>
                        <td>$5,000</td>
                    </tr>
                    <tr>
                        <td>Product 5</td>
                        <td>$3,240</td>
                    </tr>
                    </tbody>
                </Table>

                <br />

                <Col md={{ span: 3, offset: 4 }}>
                    <h3>Top 5 Best Selling</h3>
                </Col>
                <Table striped bordered responsive="md" size="sm">
                    <thead>
                    <tr>
                        <th>Table heading</th>
                        <th>Table heading</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    <tr>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
                    </tbody>
                </Table>                
            </Container>
            </div>
        )
        } else {
            return <div>Logged In</div>
        }
    }
}

export default HomePage;
