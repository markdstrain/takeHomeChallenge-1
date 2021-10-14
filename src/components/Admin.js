import React, { useState, useEffect} from 'react';
import { useData } from './hooks';
import { Table, Button, Container } from 'react-bootstrap';
import Api from '../api';



const Admin = () => {
    const [users, getUsers, isLoading] = useData('users')
    const[deleted, setDeleted]=useState("");
    

    useEffect(()=>{
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deleted]);

    
//Function so admin can delete a users profile
    async function handleDelete(e) {
              e.preventDefault();
              const info = document.getElementsByClassName(e.target.name);
              if (window.confirm(`Are you sure you want to delete the account for ${info[0].firstChild.innerText} `)) {
                    await Api.deleteUser(e.target.name);
                    setDeleted(e.target.name);
         }else return
    }
//return HTML for Admin listing all Users with a Button to be able to delete a user.
    return (
          <>
                    {isLoading && <div><p>Hello</p></div>}
                    {!isLoading && 
                    <Container className="d-flex align-items-center justify-content-center mt-1 "
                                        style={{maxHeight: "100vh"}}>
                              <div className="w-100" style={{maxWidth: "400px"}}>
                                        <div className="text-center display-4">Users</div>
                                        <Table striped bordered hover size="sm">        
                                                  <thead>
                                                            <tr className="text-center">
                                                                      <th>Name</th>
                                                                      <th>Email</th>
                                                                      <th>Delete</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {users.map(user => 
                                                                      <tr key={user.id} className={user.id}>
                                                                                <td className="text-center"> {user.firstName} {user.lastName}</td>
                                                                                <td>{user.email}</td>
                                                                                <td >
                                                                                          <Button name={user.id} className="bg-danger btn-sm" onClick={handleDelete}>
                                                                                                    Delete
                                                                                          </Button>
                                                                                </td>
                                                                      </tr>
                                                            )}
                                                  </tbody>
                                        </Table>
                              </div>
                    </Container>}
        </>
    )
}

export default Admin;