import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

// == IMPORT BOOTSTRAP ==
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


// == IMPORT ACTIONS ==
import { closeModal } from '../../slices/login';
import { handleFieldChange } from '../../slices/utilities';
import { fetchUser, addUserToState } from '../../slices/auth';

function Login () {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { isOpenLogin, isOpenSignup } = useAppSelector(state => state.loginReducer);
  const { email, password } = useAppSelector(state => state.utilitiesReducer);

  //== ACTIONS ==
  /**
   * Controle les champs d'email et de password
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    type ChangeFieldPayload = {
      value: string,
      name: string,
    }
    const changePayload: ChangeFieldPayload = {value: e.target.value, name: e.target.name};
    dispatch(handleFieldChange(changePayload));
  };
  /**
   * Ferme les modales de connexion et d'inscription
   */
  const handleClose = () => {
    dispatch(closeModal());
  };
  /**
   * Soumet email/password au middleware de connexion
   */
  const handleSubmitLogin = (e: React.SyntheticEvent) => {
    console.log('submit',email, password);
    e.preventDefault();    
    dispatch(addUserToState(email))
    dispatch(fetchUser({email, password}));
  }

  return (

    // == CALL STORE ==
    <>
      <Modal show={isOpenLogin}>
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onHide={handleClose}>
              <Modal.Title>Se Connecter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email"
                              placeholder="Entrer votre Email"
                              value={email}
                              name="email"
                              title="Email"
                              onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" 
                              placeholder="Mot de passe"
                              value={password}
                              name="password"
                              title="Mot de passe"
                              onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBhandleSubmitLoginasicCheckbox">
            </Form.Group>
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Fermer</Button>
              <Button variant="primary" onClick={handleSubmitLogin}>Valider</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </Modal>

      <Modal show={isOpenSignup}>
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onHide={handleClose}>
            <Modal.Title>S'incrire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email"
                              placeholder="Entrer votre Email"
                              value={email}
                              name="email"
                              title="Email"
                              onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" 
                              placeholder="Mot de passe"
                              value={password}
                              name="password"
                              title="Mot de passe"
                              onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBhandleSubmitLoginasicCheckbox">
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Fermer</Button>
            <Button variant="primary">Valider</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
      </Modal>
    </>
  );
}

export default Login;