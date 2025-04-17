import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@/utils';

interface Props {
  text?: string | null | undefined;
}

export default function BtnLogin({ text = 'LOGIN' }: Props): ReactComponent {
  return (
    <Link className="btn-login" to={routes.login}>
      {text}
    </Link>
  );
}
