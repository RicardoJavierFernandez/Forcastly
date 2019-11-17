import React, {Component, useCallback} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone'

import NavBar from '../components/NavBar';
import './style.css'

import {Container, Col, Row} from 'react-bootstrap';

class UploadPage extends Component {
    constructor(props) {
        super(props);
    }

    MyDropzone = () =>  {
        const onDrop = useCallback((acceptedFiles) => {
          acceptedFiles.forEach((file) => {
            const reader = new FileReader()
      
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              const binaryStr = reader.result
              console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
          })
          
        }, [])
        const {getRootProps, getInputProps} = useDropzone({onDrop})
    }

    render() {
        return(
            <div>
                <NavBar />
                <br />
                <Row>
                    <Col md={{ span: 4, offset: 5 }}>
                        <h2>Upload Excel File</h2>
                    </Col>
                </Row>
                <Row>
                <Col md={{ span: 4, offset: 4 }} className="drop-area">
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </Col>
                </Row>

            </div>
        )
    }
}

export default UploadPage;


