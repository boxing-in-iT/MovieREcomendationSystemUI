// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';

// import { history } from '_helpers';
// import { userActions, alertActions } from '_store';

// const TestRegister = () => {
//   const dispatch = useDispatch();

//   const [error, setError] = useState('');

//     // form validation rules 
//     const validationSchema = Yup.object().shape({
//         name: Yup.string()
//             .required('Name is required'),
//         mail: Yup.string()
//             .required('mail is required'),
//         birth: Yup.date()
//             .required('Username is required'),
//         profession: Yup.string()
//             .required('Prffesion is required'),
//         country: Yup.string()
//             .required('Country is required'),
//         password: Yup.string()
//             .required('Password is required')
//             .min(6, 'Password must be at least 6 characters')
//     });
//     const formOptions = { resolver: yupResolver(validationSchema) };

//      // get functions to build form with useForm() hook
//      const { register, handleSubmit, formState } = useForm(formOptions);
//      const { errors, isSubmitting } = formState;

//      async function onSubmit(data) {
//         dispatch(alertActions.clear());
//         try {
//           await dispatch(userActions.register({ ...data, favorites: [] })).unwrap();
      
//           // redirect to login page and display success alert
//           history.navigate('/account/login');
//           dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
//         } catch (error) {
//           if (error.response && error.response.data && error.response.data.message) {
//             const errorMessage = error.response.data.message;
//             console.log(errorMessage);
//             setError(errorMessage);
//           } else {
//             setError('Registration failed');
//           }
//         }
//       }

//     //  async function onSubmit(data) {
//     //     dispatch(alertActions.clear());
//     //     try {
//     //       await dispatch(userActions.register({ ...data, favorites: [] })).unwrap();
    
//     //       // redirect to login page and display success alert
//     //       history.navigate('/account/login');
//     //       dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
//     //     } catch (error) {
//     //       if (error.response) {
//     //         const errorMessage = error.response.data.message;
//     //         setError(errorMessage);
//     //       } else {
//     //         setError(error.message);
//     //       }
//     //     }
//     //   }
//   return (
//     <div className="card m-3">
//         <h4 className="card-header">Register</h4>
//         {error && <p>{error}</p>}
//         <div className="card-body">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.name?.message}</div>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Email:</label>
//                     <input name="mail" type="text" {...register('mail')} className={`form-control ${errors.mail ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.mail?.message}</div>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Birthdate:</label>
//                     <input name="birth" type="date" {...register('birth')} className={`form-control ${errors.birth ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.birth?.message}</div>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Profession:</label>
//                     <input name="profession" type="text" {...register('profession')} className={`form-control ${errors.profession ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.profession?.message}</div>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Country:</label>
//                     <input name="country" type="text" {...register('country')} className={`form-control ${errors.country ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.country?.message}</div>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.password?.message}</div>
//                 </div>
//                 <button disabled={isSubmitting} className="btn btn-primary">
//                     {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
//                     Register
//                 </button>
//                 <Link to="../login" className="btn btn-link">Cancel</Link>
//             </form>
//         </div>
//     </div>
// )
// }
// export default TestRegister;