import { useAppDispatch } from '../../hooks';

// ==IMPORT BOOTSTRAP==
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// == IMPORT IMAGE ==
import banner from '../../docs/images/banner.png'

// == IMORT STYLE ==
import 'bootstrap/dist/css/bootstrap.min.css';

// == IMPORT ACTIONS ==
import { openLogin, openSignup } from '../../slices/login'

function Header() {
const dispatch = useAppDispatch();

  //== ACTIONS =
  /**
   * Ouverte de la Modal Login
   */
  const handleLogin = () => {
    dispatch(openLogin());
  }
  /**
   * Ouverture de la modal Signup
   */
  const handleSignup = () => {
    dispatch(openSignup());
  }


  return (
    <Card>
      <Card.Img variant="top" src={banner} />
      <Card.Body>
        <Card.Text>
        Le site de sondage de la NWS
        </Card.Text>
        <Card.Text>
        <Button variant="primary" onClick={handleLogin}>Se Connecter</Button>
        <Button variant="primary"onClick={handleSignup}>S'incrire</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Header;