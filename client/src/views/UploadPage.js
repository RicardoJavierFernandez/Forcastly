import React, { useCallback, useState, useEffect } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import XLSX from 'xlsx';

import NavBar from '../components/NavBar';
import API from '../utils/API';
import './style.css'

import { Container, Col, Row, Form, Button, Table } from 'react-bootstrap';

var dataToUpload = []
var headers = []

function sendData(objArr) {
    API.createManyProducts(objArr)
        .then((dbResponse) => {
            dataToUpload = [];
            headers = [];
        })
        .catch((err) => console.log(err))

    return;
}

function clearData() {
    headers = [];
    dataToUpload = [];
}

function MyDropzone(props) {
    const[ready, setReady] = useState(false);
    const[submitted, setSubmitted] = useState(false);
    const[uploadData, setUploadData] = useState([]);

    // useEffect(() => {
    //     setUploadData(...dataToUpload, console.log('Mounting component', uploadData));
    // });

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
  
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            /* Update state */
            
            // Working on dynamically creating an array of objects to upload
            
            headers = [...data[0]]
            data.map((row, index) => {
                switch(index) {
                    case 0:
                        break;
                    default:
                        dataToUpload.push({
                            [headers[0]]: row[0],
                            [headers[1]]: row[1],
                            [headers[2]]: row[2],
                            [headers[3]]: row[3],
                            [headers[4]]: row[4]
                        });
                }
            });

            if (dataToUpload.length > 0) {
                setReady(true);
                setSubmitted(false);
                setUploadData(...dataToUpload);
            }
            };
            reader.readAsBinaryString(file);
      });
      
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    const uploadTypes = ['Product', 'Product Group', 'Transaction Type', 'Forecasts'];
    const isEnabled = ready;

    return (
        <div>
            <NavBar />

            <br />
            <Container>
                <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <h2 className= "h4">Upload Excel File</h2>
                    <Form.Label>Upload Type</Form.Label>
                    <Form.Control as="select" id="productGroupSelection">
                            {uploadTypes.map((type, index) => 
                                <option key={index} value={type + "Upload"}>
                                    {type}
                                </option>
                            )}
                    </Form.Control>
                    <br />
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                    <h2 className= "h4" >Review Files Before Upload</h2>
                    {submitted && <p>The data was uploaded to the database</p>}
                    <br />
                </Col>
                </Row>
                <Row>
                <Col md={{ span: 4, offset: 1 }} className="drop-area">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop files here, or click to select files</p>
                    </div>
                </Col>
                <Col md={{ span: 6, offset: 1 }} className="view-area">
                    <Table striped size="sm">
                    <thead>
                            <tr>
                            {headers.map((header, index) => 
                            <th key={index}>{header}</th>
                            )}
                            </tr>
                        </thead>
                        <tbody>
                            {dataToUpload.map((row, index) => 
                            <tr key={index}>
                                <td>{row.product_sku}</td>
                                <td>{row.product_asin}</td>
                                <td>{row.product_name}</td>
                                <td>{row.master_carton}</td>
                                <td>{row.product_group_id}</td>
                            </tr>)
                            }
                        </tbody>
                    
                    </Table>
                </Col>
                </Row>
                <Row>
                    <Col md={{span: 2, offset: 6}}>
                        <br />
                        <Button className="button" disabled={!isEnabled} onClick={() => {
                            sendData(dataToUpload); 
                            setReady(false); 
                            setSubmitted(true);
                            setUploadData([]);
                            }}>Upload Data</Button>
                            <p></p>
                        <Button  className= "button" disabled={!isEnabled} onClick={() => {clearData(dataToUpload); setReady(false); setUploadData([])}}>Clear Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>

    )
  }

  export default MyDropzone;