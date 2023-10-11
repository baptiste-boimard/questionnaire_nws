import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

// == IMPORT BOOTSTRAP ==
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// == IMORT STYLE ==
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

// == IMPORT ACTIONS ==
// == IMPORT ACTIONS ==
import { closeModal } from '../../slices/modalDisplay';import { handleFieldChange } from '../../slices/utilities';
import { fetchUser, resetErrorMessageLogin } from '../../slices/auth';
import { signupUser, resetErrorMessageSignup } from '../../slices/signup';

// == INTERFACE & TYPE ==
type ChangeFieldPayload = {
  value: string,
  name: string,
};


function Login () {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { isOpenLogin, isOpenSignup } = useAppSelector(state => state.modalDisplayReducer);
  const { email, password } = useAppSelector(state => state.utilitiesReducer);
  const { errorMessage, errorColor } = useAppSelector(state => state.signupReducer);

  //== ACTIONS ==
  /**
   * Controle les champs d'email et de password
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changePayload: ChangeFieldPayload = {value: e.target.value, name: e.target.name};
    dispatch(handleFieldChange(changePayload));
  };
  /**
   * Ferme les modales de connexion et d'inscription
   */
  const handleClose = () => {
    dispatch(resetErrorMessageSignup());
    dispatch(resetErrorMessageLogin());
    dispatch(closeModal());
  };
  /**
   * Soumet email/password au middleware de connexion
   */
  const handleSubmitLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user: User = {email, password}
    dispatch(resetErrorMessageLogin());
    dispatch(fetchUser(user));
  };
  /**
   * Soumet email/password au midlleware d'inscription
   */
  const handleSubmitSignup = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user: User = {email, password}
    dispatch(resetErrorMessageSignup());
    dispatch(signupUser(user));
    
  }
  return (
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
            {errorColor ? <p className='errorMessage green'>{errorMessage}</p>
                        : <p className='errorMessage red'>{errorMessage}</p>}
          <Modal.Footer>       
            <Button variant="secondary" onClick={handleClose}>Fermer</Button>
            <Button variant="primary" onClick={handleSubmitSignup}>Valider</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
      </Modal>
    </>
  );
}

export default Login;