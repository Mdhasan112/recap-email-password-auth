import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const auth = getAuth(app);
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleNameBlur = (e) => {
    setName(e.target.value)
  };
  const handleEmailBlur = (e) => {
    setEmail(e.target.value)
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        setUserName();
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  };

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
      <h3 className='text-primary'>Please register</h3>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your name</Form.Label>
          <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
