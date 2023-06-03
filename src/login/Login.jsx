import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../_helpers';
import { authActions } from '../_store';

export { Login };

function Login() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ name, password }) {
        return dispatch(authActions.login({ name, password }));
    }

    return (
        <div >
            <div>
                Username: test<br />
                Password: test
            </div>
            <div >
                <h4>Login</h4>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Username</label>
                            <input  type="text" {...register('name')}  />
                            <div>{errors.name?.message}</div>
                        </div>
                        <div>
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')}  />
                            <div>{errors.password?.message}</div>
                        </div>
                        <button disabled={isSubmitting} >
                            {isSubmitting && <span></span>}
                            Login
                        </button>
                        {authError &&
                            <div>{authError.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
