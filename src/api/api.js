import axios from 'axios';
// import dbUtil from '../dbc/dbUtil'
// var axios = require('axios')

export const getAllUsers = function () {
  return axios.get('http://localhost:3000/get-alluser')
}
