import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';


// == IMPORT ACTION ==
import {returnEmailToken} from '../../slices/signup';

function VerifyEmail () {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const emailToken: string | null = searchParams.get('emailToken');

  useEffect(() => {
    if(emailToken) {
      dispatch(returnEmailToken({emailToken}));
    } else {
      console.log('Token introuvable...');
    }
  });  
  return (
    <>
    </>
  );
}

export default VerifyEmail;