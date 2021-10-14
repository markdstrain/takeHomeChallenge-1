import React, { useRef, useState, useEffect } from 'react';
import {  Redirect } from 'react-router-dom';
import {  useParams  } from "react-router";
import { useData } from "./hooks";
import { Form, Button, Card, Container } from 'react-bootstrap';
import Api from '../api';

//have users update their profiles with a couple of options to cancel their update or submit it.
function ProfileEditor(){

 //setting up Refs that will be acquired from html inputs  also setting up local state for cancel and submit.
          const {id} = useParams()
          const [user, getUser, isLoading] = useData('user', id);
          const [edited, setEdited] = useState(false);
          const firstNameRef = useRef();
          const lastNameRef = useRef();
          const emailRef = useRef();
          


//useEffect gives us the Users information so that we can display it on the profile page.
          useEffect(() => {
                    getUser()
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

// handle submit get the values of the ref send to api get updated.
          async function handleSubmit(e) {
                    e.preventDefault();
                    const input = {id: user.id,
                                              firstName: firstNameRef.current.value,
                                              lastName: lastNameRef.current.value,
                                              email: emailRef.current.value,
                                        };
                    const newInfo = await Api.editData(id, input);
                    console.log(newInfo);
//setting up the local state so that it will redirect the profilepage after editing
                    setEdited(true);
          }
                    
//handle cancel just set the state to cancel and redirect to profile page.
          function handleCancel(e) {
                    e.preventDefault();

//setting up the local state so that it will redirect the profilepage after editing
                    setEdited(true);        
          }

// if submitted redirect to homepage.
          if(edited)return <Redirect push to = {`/${user.id}`} />

//returning html for a edit page using react bootstrap and setting Refs with default values included.
          return(
                    <>
                              <div>
                                        {!isLoading &&
                                        <Container className="d-flex align-items-center justify-content-center mt-1 "
                                                  style={{maxHeight: "100vh"}}>
                                                  <div className="w-100" style={{maxWidth: "400px"}}>
                                                            <Card>
                                                                      <Card.Header className="bg-primary text-light">
                                                                                <h2 className="text-center mb-1">Editing the profile for </h2>
                                                                                <h2 className="text-center mb-1">{user.firstName} {user.lastName}</h2>
                                                                      </Card.Header>
                                                                      <Card.Body>
                                                                                <Form onSubmit={ handleSubmit }>
                                                                                          <Form.Group id="first-name">
                                                                                                    <Form.Label>First Name:</Form.Label>
                                                                                                    <Form.Control defaultValue= {user.firstName} type="first-name" ref={firstNameRef} required />
                                                                                          </Form.Group>
                                                                                          <Form.Group id="last-name">
                                                                                                    <Form.Label>Last Name:</Form.Label>
                                                                                                    <Form.Control defaultValue={user.lastName} type ="last-name" ref={lastNameRef} required />
                                                                                          </Form.Group>
                                                                                          <Form.Group id="email">
                                                                                                    <Form.Label>email:</Form.Label>
                                                                                                    <Form.Control defaultValue= {user.email} type ="email" ref={emailRef} required />
                                                                                          </Form.Group>
                                                                                          <div className="d-flex justify-content-around mt-4">
                                                                                                    <span>
                                                                                                              <Button className="px-4 bg-primary" onClick={handleSubmit}>
                                                                                                                        Edit
                                                                                                              </Button>
                                                                                                    </span>
                                                                                                    <span>
                                                                                                              <Button className="px-3 bg-warning" onClick={handleCancel}>
                                                                                                                        Cancel
                                                                                                              </Button>
                                                                                                    </span>
                                                                                          </div>
                                                                                </Form>
                                                                      </Card.Body>
                                                            </Card>
                                                  </div>
                                        </Container>
                                        }
                                        {isLoading && <div>Loading...</div>}
                              </div>
                    </>
          )
}
export default ProfileEditor;