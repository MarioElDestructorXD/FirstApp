import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import axios from "../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react"
import { CategoryForm } from './CategoryForm';

export const CategoryList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const getCategories = () =>{
        axios({url: "/category/", method:"GET"})
        .then((response)=> {
            setCategories(response.data);
            setIsLoading(false);
        })
        .catch((error)=>{
            console.log(error)
        });
    }

    useEffect(() => {
        setIsLoading(true);
        getCategories();
    }, []);

    const columnss = [
        {
            name : "#",
            cell : (row,index) => <div>{index+1}</div>,
        },
        {
            name: "Categría",
            cell: row => <div>{row.description}</div>,
        },
        {
            name: "Estado",
            cell : row => row.status.description === "Activo" ?
            (<Badge pill bg = "success">{row.status.description}</Badge>):
            (<Badge pill bg = "danger">{row.status.description}</Badge>)

        }
    ];

    const paginationOption = {
        rowsperPageText: "Filas por pagínas",
        rangeSeparator: "de",
    }
    
  return (
  
    <Row className='mt-5'>
        <Col>
            <Card>
                <Card.Header>
                    <Row>
                        <Col>Categoría</Col>
                        <Col className = "text-end">
                            <CategoryForm isOpen={isOpen} handleClose={()=>setIsOpen(false)}></CategoryForm>
                            <Button variant='success' onClick={()=>setIsOpen(true)}>
                                <FeatherIcon icon = "plus"></FeatherIcon>
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                    <DataTable title = "Listado" columns={columnss} data = {categories} pagination paginationComponentOptions={paginationOption}></DataTable>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </Col>

    </Row>
  )
}
