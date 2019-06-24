const status = 'development';
 // const status = 'production';

const getApi = () =>{
  if(status === 'development'){
    return 'http://localhost:8080';
  }else{
    return 'http://www.comingsoontour.com';
  }
}

export const url = getApi();
