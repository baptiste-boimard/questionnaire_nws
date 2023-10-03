
import { useAppDispatch, useAppSelector } from '../../hooks';

// == IMPORT BOOTSTRAP ==
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// == IMPORT ACTIONS ==
import { closeModal } from '../../slices/login';
// import { isOpenLogin } from '../../slices/login';

function Login () {
  const dispatch = useAppDispatch();
  const { isOpenLogin, isOpenSignup } = useAppSelector(state => state.loginReducer);

  //== ACTIONS ==
  /**
   * Ferme les modales de connexion d'inscription
   */
  const handleClose = () => {
    dispatch(closeModal());
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

            {/* FORM */}

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Fermer</Button>
              <Button variant="primary">Valider</Button>
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

          {/* FORM */}

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