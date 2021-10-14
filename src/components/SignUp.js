import React, { useRef, useState } from 'react';
import {  Redirect } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import Api from '../api';

//have user signup here if already signed up and user is in state and local storage then redirect them to
//their homepage.
function SignUp(){

 //setting up Refs that will be acquired from html inputs  also setting up local state for registered.
          const firstNameRef = useRef();
          const lastNameRef = useRef();
          const emailRef = useRef();
          const [registered, setRegistered] = useState(false);
          const [userState, setUserState ] =useState();


// handle submit get the values of the ref send to api set registered.
          async function handleSubmit(e) {
                    e.preventDefault();
                    const input = {firstName: firstNameRef.current.value,
                                              lastName: lastNameRef.current.value,
                                              email: emailRef.current.value};
                    const user = await Api.register(input);
                    console.log(user)
//setting up the local state so that it will redirect the page after signing up
                    setUserState(user.data.id);
                    setRegistered(true);                   
          }
// if registered or user is in the local storage redirect to homepage.
          if (registered) return <Redirect  push to= {`/${userState}`}/>
//returning html for a signup page using react bootstrap and setting Refs 
          return(
                    <>
                              <Container className="d-flex align-items-center justify-content-center mt-1 "
                                        style={{maxHeight: "100vh"}}>
                                        <div className="w-100" style={{maxWidth: "400px"}}>
                                                  <Card>
                                                            <Card.Body>
                                                                      <h2 className="text-center mb-1">Sign Up</h2>
                                                                      <Form onSubmit={ handleSubmit }>
                                                                                <Form.Group id="first-name">
                                                                                          <Form.Label>First Name:</Form.Label>
                                                                                          <Form.Control type="first-name" ref={firstNameRef} required />
                                                                                </Form.Group>
                                                                                <Form.Group id="last-name">
                                                                                          <Form.Label>Last Name:</Form.Label>
                                                                                          <Form.Control type ="last-name" ref={lastNameRef} required />
                                                                                </Form.Group>
                                                                                <Form.Group id="email">
                                                                                          <Form.Label>email:</Form.Label>
                                                                                          <Form.Control type ="email" ref={emailRef} required />
                                                                                </Form.Group>
                                                                                <Button className="w-100 mt-2" type="submit">Sign Up</Button>
                                                                      </Form>
                                                            </Card.Body>
                                                  </Card>
                                        </div>
                              </Container>
                    </>
          )
}
export default SignUp;