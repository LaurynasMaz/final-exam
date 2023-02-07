import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import UserContext from "../contexts/UserContext"
import { useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import Header from '../components/Header';

const Register = () => {

   const [formInputs] = useState({
      username: '',
      email:'',
      password: '',
      passwordRepeat: '',
      avatar: ''
   });
   const validationSchema = Yup.object().shape({
      username: Yup.string()
         .min(4, 'username must be at least 4 symbols')
         .required('This field must be filled.'),
      email: Yup.string()
         .email('Must be proper Email')
         .required('This field must be filled.'),   
      password: Yup.string()
         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$-/:-?{-~!"^_`[\]])(?=.{8,})/,
         'Password must contain 8 letters, atleast one capitalize letter, number, simbol')
         .required('This field must be filled.'),
      passwordRepeat: Yup.mixed()
         .oneOf([Yup.ref('password'), null], 'Passwords must match.')
         .required('This field must be filled.'),
   });

   const [invalidusername, setInvalidUsername] = useState(false);

   const { users, addNewUser, setLoggedInUser } = useContext(UserContext);
   const navigation = useNavigate();


   const handleSubmit = (values) => {
      const {username, email, password , avatar} = values

      if(users.find(user => user.username === values.username)){
         setInvalidUsername(true);
      } else {
         let newUser = {
            id: Date.now(),
            username,
            email,
            password,
            avatar
         };
         addNewUser(newUser);
         setLoggedInUser(newUser);
         navigation('/');
      }
   }
   
      

   return (
      <>
      <Header />
       <Formik
         initialValues={formInputs}
         validationSchema={validationSchema}
         onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
         }}
         >
            {({ errors, touched, values, setValues}) => (
               <Form>
                  <div className='form-container'>
                     <div>
                        <label>
                           User name:
                           <Field type="text" name="username" value={values.username}
                              onChange={(e) => setValues({...values, username:e.target.value})}
                           />
                           {
                              errors.username && touched.username ? 
                                 <span>{errors.username}</span>
                                 : null
                           }
                        </label>
                     </div>
                     <div>
                        <label>
                           Email:
                           <Field type="email" name="email" value={values.email}
                              onChange={(e) => setValues({...values, email:e.target.value})}
                           />
                           {
                              errors.email && touched.email ? 
                                 <span>{errors.email}</span>
                                 : null
                           }
                        </label>
                     </div>
                     <div>
                        <label>
                           Password:
                           <Field type= 'password' name="password" value={values.password}
                              onChange={(e) => setValues({...values, password:e.target.value})}
                           />
                           {
                              errors.password && touched.password ? 
                                 <span>{errors.password}</span>
                                 : null
                           }
                        </label>
                     </div>
                     <div>
                        <label>
                           Repeat Password:
                           <Field type= 'password' name="password" value={values.passwordRepeat}
                              onChange={(e) => setValues({...values, passwordRepeat:e.target.value})}
                           />
                           {
                              errors.passwordRepeat && touched.passwordRepeat ?
                                 <span>{errors.passwordRepeat}</span>
                                 : null
                           }
                        </label>
                     </div>
                     <div>
                     <label>
                        User picture:
                        <input type="url" name="avatar" values={values.avatar}
                           onChange={(e) => setValues({...values, avatar:e.target.value})}
                        />
                     </label>
                     </div>
                     <div>
                        <button type="submit">Register</button>
                     </div>
                  </div>
               </Form>
            )}   
         </Formik>
         <>
         </>
         {
            invalidusername && <span>User with such name already exists.</span>
         }
      </>
   );
}

export default Register;