import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const auth = getAuth(app);
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [seccess, setSuccess] = useState('')
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState('')

  const handleNameBlur = (e) => {
    setName(e.target.value)
  };
  const handleEmailBlur = (e) => {
    setEmail(e.target.value)
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value)
  };

  const handleRegisteredChange = (e) => {
    setRegistered(e.target.checked)
  }
  const handleFormSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setValidated(true);

    e.preventDefault();
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
          setError('');
        })
        .catch(error => {
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setUserName();
          console.log(user)
          verifyEmail();
          setSuccess('Account creating successful')
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        });
    }
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email sent')
      })
  };
  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('sent forget email')
      })
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(result => {
        // console.log('updating name')
      })
      .catch(error => {
        console.error(error.message)
      })
  };
  return (
    <div className='w-50 mx-auto'>
      <h3 className='text-primary'>Please {!registered ? 'Register' : 'Login'}</h3>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {!registered && <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your name</Form.Label>
          <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter your name" required />
          <Form.Control.Feedback type="invalid">
            Please choose a valid name.
          </Form.Control.Feedback>
        </Form.Group>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <p className='text-success'>{seccess}</p>
        <p className='text-danger'>{error}</p>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
        </Form.Group>
        <Button onClick={handleForgetPassword} className='text-danger' variant="link">Forget password</Button>
        <br />
        <Button variant="primary" type="submit">
          {!registered ? 'Register' : 'Login'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
