import axios from 'axios';

class Api {
//Api function to register new users
          static async register(data){
                    const userData = {...data, state: 'active'}
                    const newUser = await axios.post('http://localhost:3001/users/',userData)
                   return newUser
          }
//Api function to return a list of all users
          static async getAllUsers(){
                    const users = await axios.get('http://localhost:3001/users/')
                    console.log(users)
                    return users.data
          }
//Api function to get a Specific User
          static async getUser(id){
                    const user = await axios.get(`http://localhost:3001/users/${id}`)
                    return user.data
          }
//Api function to delete a user
          static async deleteUser(id){
                    await axios.delete(`http://localhost:3001/users/${id}`);
                    console.log("This account has been successfully deleted");
          }
//Api function to make edits to your profile  
          static async editData(id, data){
                    const info = await axios.put(`http://localhost:3001/users/${id}`, data);
                    return info;
          }
}

export default Api;