import React, {Component, useCallback, useState} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';
import XLSX from 'xlsx';

import NavBar from '../components/NavBar';
import API from '../utils/API';
import './style.css'

import {Col, Row, Form, Button} from 'react-bootstrap';


function MyDropzone(props) {
    const[ready, setReady] = useState(false);

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
            let dataToUpload = [1]
            let headers = [...data[0]]
            data.map((row, index) => {
                switch(index) {
                    case 0:
                        break;
                    default:
                        dataToUpload.push(
                        {
                            [headers[0]]: row[0],
                            [headers[1]]: row[1],
                            [headers[2]]: row[2],
                            [headers[3]]: row[3],
                            [headers[4]]: row[4]
                        });
                }
            });
            setReady({ready: true}, console.log(ready));

            // API.createManyProducts(dataToUpload)
            //     .then((dbResponse) => console.log(dbResponse))
            //     .catch((err) => console.log(err))
            };
            reader.readAsBinaryString(file);
      });
      
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    const uploadTypes = ['Product', 'Product Group', 'Transaction Type'];

    return (
        <div>
            <NavBar />

            <br />
            <Col md={{ span: 4, offset: 4 }}>
                <h2>Upload Excel File</h2>
                <Form.Label>Upload Type</Form.Label>
                <Form.Control as="select" id="productGroupSelection">
                        {uploadTypes.map((type, index) => 
                            <option key={index} value={type + "Upload"}>
                                {type}
                            </option>
                        )}
                </Form.Control>
            </Col>
            <Col md={{ span: 4, offset: 4 }} className="drop-area">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </Col>
        </div>

    )
  }

  export default MyDropzone;


