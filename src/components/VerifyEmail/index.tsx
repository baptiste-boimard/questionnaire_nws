import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';

import {returnEmailToken} from '../../slices/auth';

function VerifyEmail () {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const emailToken = searchParams.get('emailToken');

  console.log(emailToken);

  useEffect(() => {
    if(emailToken) {
      dispatch(returnEmailToken({emailToken}));
    }
  }, [emailToken]);  

  return (
    <div>

    </div>
  );
}

export default VerifyEmail;