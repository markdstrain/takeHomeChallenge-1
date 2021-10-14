import React, { useState, useEffect } from "react";
import {  useParams  } from "react-router";
import { Redirect } from "react-router-dom";
import { useData } from "./hooks";
import { Button, Card, Container } from 'react-bootstrap';
import Api from "../api";

const Profile = () =>{
          
//setting up the Parameters of the page, calling on the hook to get our profile info, and calling on state to handle
//delete capabilities.
          const {id} = useParams()
          const [user, getUser, isLoading] = useData('user', id);
          const[deleted, setDeleted] = useState(false)
          const[edited, setEdited] = useState(false)

//useEffect gives us the Users information so that we can display it on the profile page.
          useEffect(() => {
                   getUser()
                   // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

//This function will redirect you to a page where you can edit this person's profile page.
          function handleEdit(e) {
                    e.preventDefault();
                    setEdited(true);
                    
          };
// this function handles delete capabilities but will get a confirmation of you deleting the account
          async function handleDelete(e) {
                    e.preventDefault();
                   if (window.confirm(`Are you sure you want to delete the account for ${user.firstName} ${user.lastName}?`)) {
                              await Api.deleteUser(id);
                              setDeleted(true);
                   }else return
          };
//handling the redirect to the sign up page if the profile is deleted or edited
          if(deleted) return <Redirect push to = '/' />;
          if(edited)return <Redirect push to = {`/edit/${user.id}`} />

//This will give us the html for the person's profile and give a few options of whether to delete or edit
          return(
                    <div>
                              {!isLoading &&
                              <Container className="d-flex align-items-center justify-content-center mt-1 "
                                                   style={{maxHeight: "100vh"}}>
                                        <div className="w-100" style={{maxWidth: "400px"}}>
                                                  <Card>
                                                            <Card.Header className="display-2 bg-primary text-light text-center"> 
                                                                      Profile Page 
                                                            </Card.Header>
                                                            <Card.Body>
                                                                      <div className="h2">
                                                                                Name: {user.firstName} {user.lastName}
                                                                      </div>
                                                                      <div className="h4">
                                                                                email: {user.email}
                                                                      </div>
                                                                      <div className="d-flex justify-content-around mt-4">
                                                                                <span>
                                                                                          <Button className="px-4 bg-warning" onClick={handleEdit}>
                                                                                                    Edit
                                                                                          </Button>
                                                                                </span>
                                                                                <span>
                                                                                          <Button className="px-3 bg-danger" onClick={handleDelete}>
                                                                                                    Delete
                                                                                          </Button>
                                                                                </span>
                                                                      </div>
                                                            </Card.Body>
                                                  </Card>
                                        </div>

                              </Container>
                              }
                              {isLoading && <div>Loading...</div>}
                    </div>
          )
}

export default Profile;