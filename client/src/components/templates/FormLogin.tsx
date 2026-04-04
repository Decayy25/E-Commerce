import { Fragment, useState } from 'react';

export default function FormLogin() {
  const [formData, setFormData] = useState<LoginFormData>({email: '',password: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <Fragment>
            
        </Fragment>
    );
}