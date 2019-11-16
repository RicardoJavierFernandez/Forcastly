import React, { Component } from 'react';
import API from '../utils/API';

import NavBar from '../components/NavBar';

import {Form, Container, Col, Button, Table} from 'react-bootstrap';


class CreateProductGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            groupInfo: {
                group_id: '',
                group_name: '',
            },
            productGroups: []
        }
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    createGroup = (e) => {
        e.preventDefault();

        API.createGroup(this.state.groupName)
            .then((dbResponse) => {
                this.setState({groupName: ''}, () => {
                    document.getElementById('groupName').value = '';
                    this.getGroups(); // refresh to get new list of groups
                })
            })
    }

    getGroups = (e) => {
        
        API.getAllProductGroups()
            .then((dbResponse) => {
                let dbData = []
                dbResponse.data.map((group, index) => {
                    dbData.push(group);
                });

                this.setState({productGroups: dbData}, () => console.log(this.productGroups));
            })
    }

    updateGroup = (e) => {
        e.preventDefault();  

        let newInfo = {
            group_id: e.target.id,
            group_name: e.target.name
        }
        
        this.setState({groupInfo: newInfo}, () => {
            console.log('Updating:', this.state.groupInfo);
        })

    }

    changeInputBox = (e) => {
        // console.log(document.getElementById(e.target).firstElementChild);
        console.log('Change input box.');
    }

    componentDidMount() {
        this.getGroups();
    }

    render() {

        // isEnable boolean for the button
        const isEnabled = this.state.groupName.length > 0;

        return(
            <div>
                <NavBar />
                <Container>
                    <br />
                    <Col md={{ span: 4, offset: 4 }}>
                        <h2>Create Product Group</h2>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Product Group Name</Form.Label>
                                <Form.Control type="text" rows="1" name="groupName" id= "groupName" placeholder="Required Field" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button disabled={!isEnabled} variant="primary" onClick={this.createGroup}>Add Group</Button>
                    </Col>

                    <br />

                    <Col md={{ span: 4, offset: 4 }}>
                    <h2>Update Product Group</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Product Group</th>
                            <th>Update Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productGroups.map((group, index) =>
                            <tr key={index}>
                            <td onClick={this.changeInputBox}>
                                {group.group_name}
                                <input 
                                    type="hidden" 
                                    placeholder="Enter New Name"
                                    id={'input' + group.product_group_id}>
                                </input>
                            </td>
                            <a id={group.product_group_id} href="" onClick={this.updateGroup}>Update</a>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default CreateProductGroup;