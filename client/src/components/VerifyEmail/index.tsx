import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router';



// == IMPORT BOOTSTRAP ==
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// == IMPORT ACTION ==
import {returnEmailToken} from '../../slices/signup';
import { closeModal } from '../../slices/modalDisplay';

function VerifyEmail () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //Récupération du token dans la barre d'adresse
  const [searchParams] = useSearchParams();
  const emailToken: string | null = searchParams.get('emailToken');

  useEffect(() => {
    if(emailToken) {
      dispatch(returnEmailToken({emailToken}));
    } else {
      console.log('Token introuvable...');
    }
  });  

  // == CALL STORE ==
  const { isOpenVerify } = useAppSelector(state => state.modalDisplayReducer);

    //== ACTIONS ==
  /**
   * Ferme les modales de connexion et d'inscription
   */
    const handleClose = () => {
      dispatch(closeModal());
      navigate('/')
    };

  return (
    <>
      <Modal show={isOpenVerify}>
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onHide={handleClose}>
              <Modal.Title>Vérification de votre email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Votre email a été verifié avec succès. Vous pouvez  maintenant vous connecter
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Fermer</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </Modal>
    </>
  );
}

export default VerifyEmail;