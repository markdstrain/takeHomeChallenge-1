import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import Admin from './Admin';
import Profile from './Profile';
import ProfileEditor from './ProfileEditor';


function App() {
          return(
                    <div>
                              <Switch>

                                        <Route exact path="/admin">
                                                  <Admin />
                                        </Route>
                                        <Route exact path="/:id">
                                                 <Profile />
                                        </Route>
                                        <Route exact path = '/'>
                                                  <SignUp />
                                        </Route>
                                        <Route exact path="/edit/:id">
                                                  <ProfileEditor />
                                        </Route>
                              </Switch>
                     </div>
          )
}
export default App;
