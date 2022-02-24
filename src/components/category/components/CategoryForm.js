import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import FeatherIcon from "feather-icons-react"
import * as yup from "yup";
import {useFormik} from "formik";

export const  CategoryForm = ({isOpen, handleClose}) => {

    const formik = useFormik ({
        initialValues: {
            description: "",
            status : {
                id : 1,
                description: "Activo",
            },
        },
        validationSchema : yup.object().shape({
            description:yup.string().required("Campo Obligatorio"),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

  return (
    <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="description" placeholder="Gaming" value={formik.values.description} onChange = {formik.handleChange}></Form.Control>
                    {
                        formik.errors.description ? (
                        <span>{formik.errors.description}</span> ): null
                    }
                </Form.Group>
                <Form.Group className="mb-4">
                    <Row>
                        <Col className = "text-end">
                            <Button variant = "danger" type = "button" onClick={handleClose}>
                                <FeatherIcon icon={"x"}></FeatherIcon>
                                &nbsp; Cerrar
                            </Button>
                            <Button variant = "success" type = "submit" disabled = {formik.isValid}>
                                <FeatherIcon icon={"check"}></FeatherIcon>
                                &nbsp; Guardar
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Modal.Body>
      </Modal>
  )
}
