import axios from 'axios'
import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { ButtonCircle } from '../../shared/components/ButtonCircle'

export const productScreem = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([])

    const getProducts = () =>{
        axios({url: "/product", method: "GET"})
        .then((response) =>{
            console.log(response)
            setIsLoading(false)
        }).catch((error) =>{
            console.log(error)
        })
    }

    const columns = [
        {
            name: "#",
            cell: (row, index) = <div>{index + 1}</div>,
        },
    ]

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>Categorías</Col>
                            <Col className="text-end">
                                <ButtonCircle
                                    type={"btn btn-success btn-circle"}
                                    onClickFunct={() => setIsOpen(true)}
                                    icon="plus"
                                    size={20}
                                />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <DataTable>

                        </DataTable>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
