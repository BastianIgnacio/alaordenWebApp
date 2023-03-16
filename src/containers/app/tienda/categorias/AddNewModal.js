/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row,
  FormGroup,
  InputGroup,
} from 'reactstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactCrop from 'react-image-crop';
import { getStorage, ref, uploadString } from 'firebase/storage';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PreviewImage from './PreviewImage';
import { NotificationManager } from '../../../../components/common/react-notifications';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-image-crop/lib/ReactCrop.scss';
import { addCategoriaItem } from '../../../../redux/categorias/actions';

const AddNewModal = ({ localComercial, modalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.categorias.modalAddLoading);
  const [modalCut, setModalCut] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [src, setSrc] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [crop, setCrop] = useState({ aspect: 3 / 1 });
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [output, setOutput] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [canAdd, setCanAdd] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('No hay imagen seleccionada');
  // Metodo para ocultar imagen al cerrar el modal de recorte
  const toggleModalCut = () => {
    setSrc(null);
    setImage(null);
    setOutput(null);
    setCanAdd(false);
    setModalCut(false);
    setError('No hay imagen seleccionada');
  };

  const resetImage = () => {
    setSrc(null);
    setImage(null);
    setOutput(null);
    setCanAdd(false);
    setError('No hay imagen seleccionada');
  };

  const notificacionWarning = (titulo, subtitulo) => {
    NotificationManager.warning(titulo, subtitulo, 4000, null, null, 'filled');
  };

  // Metodo para cortar la imagen
  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/webp');
    // Validamos si la seleccion es vacia
    if (base64Image === 'data:,') {
      notificacionWarning(
        'Debes seleccionar un trazo de la imagen',
        'ERROR AL RECORTAR'
      );
    } else {
      setCanAdd(true);
      setOutput(base64Image);
      setModalCut(!modalCut);
      setError(null);
    }
  };

  // Validacion para el form que envia la orden
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido!'),
  });

  // Enviamos la nueva categoria
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      if (!canAdd) {
        notificacionWarning(
          'Debes seleccionar una imagen, puede ser extension PNG, JPGE O WEB',
          'IMAGEN'
        );
      } else {
        // ACA DEBERIAMOS INICIAR UN SAGA PARA SUBIR LA IMAGEN A FIRESTORE
        // POSTERIORMENTE DENTRO DEL SAGA SE DEBE SUBIR UNA CATEGORIA
        // Aca debemos enviar la img a firestore
        const imageBase64 = output;
        const categoria = {
          nombre: values.nombre,
          refLocalComercial: localComercial.id,
        };

        dispatch(
          addCategoriaItem(
            categoria,
            imageBase64,
            toggleModal,
            resetForm,
            resetImage
          )
        );
      }
      setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={{
        nombre: '',
        imagen: null,
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({
        // eslint-disable-next-line no-unused-vars
        handleSubmit,
        handleReset,
        // eslint-disable-next-line no-unused-vars
        setFieldValue,
        // eslint-disable-next-line no-unused-vars
        setFieldTouched,
        // eslint-disable-next-line no-unused-vars
        handleChange,
        // eslint-disable-next-line no-unused-vars
        handleBlur,
        // eslint-disable-next-line no-unused-vars
        values,
        errors,
        touched,
        // eslint-disable-next-line no-unused-vars
        isSubmitting,
      }) => (
        <>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            {loading ? (
              <div className="loading" />
            ) : (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalHeader toggle={toggleModal}>
                  Añadir Nueva Categoria
                </ModalHeader>
                <ModalBody>
                  <Row>
                    <Colxx xxs="12" xs="12" lg="12">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="categoria.nombreCategoria" />
                        </Label>
                        <Field className="form-control" name="nombre" />
                        {errors.nombre && touched.nombre ? (
                          <div className="invalid-feedback d-block">
                            {errors.nombre}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" xs="12" lg="12">
                      <FormGroup className="error-l-175">
                        <Label className="font-weight-bold">
                          FOTO DE LA CATEGORIA
                        </Label>
                        <InputGroup className="mb-3">
                          <Input
                            className="form-control"
                            type="file"
                            name="imagen"
                            onChange={(event) => {
                              const { type } = event.target.files[0];
                              if (
                                type === 'image/jpeg' ||
                                type === 'image/png' ||
                                type === 'image/webp'
                              ) {
                                setSrc(
                                  URL.createObjectURL(event.target.files[0])
                                );
                                setCanAdd(false);
                                setModalCut(!modalCut);
                              } else {
                                setSrc(null);
                                setImage(null);
                                setOutput(null);
                                setCanAdd(false);
                                setError(
                                  'Imposible visualizar, debe ser formato PNG O JPEG'
                                );
                              }
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" xs="12" lg="12">
                      {output && (
                        <PreviewImage className="d-flex" base64={output} />
                      )}
                      {error && <Label className="d-block">{error}</Label>}
                    </Colxx>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    outline
                    onClick={() => {
                      handleReset();
                      setSrc(null);
                      setImage(null);
                      setOutput(null);
                      setCanAdd(false);
                      setError(null);
                      toggleModal();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Agregar
                  </Button>{' '}
                </ModalFooter>
              </Form>
            )}
          </Modal>
          <Modal isOpen={modalCut} size="lg" toggle={() => toggleModalCut()}>
            <ModalHeader>Recortando la imagen</ModalHeader>
            <ModalBody>
              <div>
                {src && (
                  <div>
                    <ReactCrop
                      src={src}
                      onImageLoaded={setImage}
                      crop={crop}
                      onChange={setCrop}
                    />
                    <br />
                    <Button block onClick={cropImageNow}>
                      Recortar y guardar
                    </Button>
                    <br />
                    <br />
                  </div>
                )}
              </div>
            </ModalBody>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default AddNewModal;
