import { useAppDispatch, useAppSelector } from '../../hooks';

// ==IMPORT BOOTSTRAP==
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// == IMPORT IMAGE ==
import banner from '../../docs/images/banner.png'

// == IMORT STYLE ==
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

// == IMPORT ACTIONS ==
import { openLogin, openSignup } from '../../slices/modalDisplay';
import { disconnect } from '../../slices/auth';

function Header() {
const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { isLogin } = useAppSelector(state => state.authReducer);

  //== ACTIONS =
  /**
   * Ouverte de la Modal Login
   */
  const handleLogin = () => {
    dispatch(openLogin());
  };
  /**
   * Ouverture de la modal Signup
   */
  const handleSignup = () => {
    dispatch(openSignup());
  };
  const handleDisconnect = () => {
    dispatch(disconnect());
  }


  return (
    <Card>
      <Card.Img variant="top" src={banner} />
      <Card.Body className='card-bodyContainer'>
        <Card.Text className='text'>
        Le site de sondage de la NWS
        </Card.Text>
        <Card.Text className='buttons'>
        {!isLogin && (
          <Button className='button' variant="primary" onClick={handleLogin}>Se Connecter</Button>
        )}
        {isLogin && (
          <Button className='button' variant="primary" onClick={handleDisconnect}>Déconnexion</Button>
        )}
        <Button className='button' variant="primary"onClick={handleSignup}>S'incrire</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Header;