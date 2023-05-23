import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookSignUp = () => {
    const responseFacebook = (response) => {
        console.log(response);
      };
    
      return (
        <div>
          <FacebookLogin
            appId="242270658399099"
            fields="name,email,picture" 
            callback={responseFacebook} 
          />
        </div>
      );
};

export default FacebookSignUp;
