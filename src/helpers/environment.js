let APIURL = '';

switch(window.location.hostname)
{
  case 'localhost' || '127.0.0.1' :
    APIURL = 'http://localhost:3000';
    break;

   default :
    APIURL = 'https://dg-mainichi.herokuapp.com'; 
    break;
};

export default APIURL;