import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, msjExito, titleExito, msjError, titleError } from '../../../shared/plugins/alert';
import axios from '../../../shared/plugins/axios'

export const CategoryFormEdit = ({isOpen, onClose, id, description, status,setCategories}) => {

  const [category, setCategory] = useState({id:id, description:description,status:status})

  const handleSubmit = (event)  =>{
    event.preventDefault()
    Alert.fire({
      title: titleConfirmacion,
      text: msjConfirmacion,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
      showCancelButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios({url: '/category/', method: 'PUT', data: JSON.stringify(category)}).then((response) => {
          if(!response.error){
            setCategories((categories) =>[
              category,
              ...categories.filter((category) => category.id !== id)
            ])
            handleCloseForm()
            Alert.fire({
              title: titleExito,
              text: msjExito,
              confirmButtonText: 'Aceptar',
              icon: 'success'
            })
          }
        }).catch((error) => {
          Alert.fire({
            title: titleError,
            text: msjError,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#198754',
            icon: 'error',
          })
        })
      },
      backdrop: true,
      allowOutsideClick: !Alert.isLoading,
    });
  };

  const handleChange = (event) =>{
    const {name, value} = event.target
    setCategory({...category, [name]:value})
  }

  const handleCloseForm = () =>{
    setCategory({});
    onClose();
  }

  useEffect(() =>{
    setCategory({
      id:id,
      description: description,
      status:status,
    })
  },[id])

  return (
    <>
      <Modal show={isOpen} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className='form-label'>Nombre</Form.Label>
              <Form.Control
                name="description"
                placeholder="Gaming"
                value={category.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Row>
                <Col className="text-end">
                  <Button variant="danger" type="button" onClick={handleCloseForm}>
                    <FeatherIcon icon={"x"} />
                    &nbsp; Cerrar
                  </Button>
                  <Button
                    variant="success"
                    className="ms-3"
                    type="submit"
                    disabled={false}>
                    <FeatherIcon icon={"check"} />
                    &nbsp; Guardar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      );
    </>
  )

};
