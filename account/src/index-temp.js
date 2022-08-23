
const express = require('express');
const PORT = process.env.PORT;
const AWS = require("aws-sdk");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
app = express();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region:"ap-northeast-2"
})

const poolData = { 
  UserPoolId : process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId : process.env.AWS_COGNITO_CLIENT_ID
};

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();


// //client로 요청을 기다린다
app.listen(PORT, function () {
    console.log('server on! ' + PORT);
});

// //회원가입
app.get('/account/signup',function(req,res){
    const createUserParams =
      {
        "UserPoolId": USERPOOL_ID,
        "DesiredDeliveryMediums": [ "EMAIL" ],
        "Username": "seri1749@naver.com",
        "Password": "cHpTg|f5",
        "newPassword": "Xptmxmdyd11!",
        "UserAttributes":
        [
          {
            "Name": "email",
            "Value": "seri1749@naver.com" //이 메일로 인증메일이 가기 때문에 잘 적어줘야 한다.
          },
          {
            "Name": "given_name",
            "Value": "sery"
          },
          {
            "Name": "family_name",
            "Value": "choi"
          },
          {
            "Name": "email_verified",
            "Value": "true"
          }
        ]
      };
      cognitoIdentityServiceProvider.adminCreateUser(createUserParams,function(err,data){
        if(err)
        {
          console.log(err);
          if(err.message.startsWith('User account already exists')){
            res.json({code:-1, msg:'이미 존재하는 아이디입니다.'});
          }else if(err.message.startsWith('An account with the email already exists')){
            res.json({code:-2, msg:'이미 등록된 이메일 주소입니다.'});
          }
        }
        else
        {
          console.log(data);
          res.json({code:0, msg:'계정 생성 안내 이메일이 발송되었습니다.'});
        }
      });
    });


    // req.on('data', function(chunk) {
    //   var datalist = JSON.parse(chunk).data;
    //   var userName = datalist[0];
    //   var email = datalist[1];
    //   var givenName = datalist[2];
    //   var familyName = datalist[3];
      
    // });
  //})
  function getUserPool(){
    return new AmazonCognitoIdentity.CognitoUserPool(poolData);
  }

  function getCognitoUser(email) {
    const userData = {
      Username: email,
      Pool: getUserPool()
    };
    return new AmazonCognitoIdentity.CognitoUser(userData);
  }

  function getAuthDetails(email, password) {
    var authenticationData = {
      Username: email,
      Password: password,
     };
    return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  }

  function signIn(email, password) {
    return new Promise((resolve) => {
      getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
        onSuccess: (result) => {
          const token = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          }  
          return resolve({ statusCode: 200, response: AwsConfig.decodeJWTToken(token) });
        },
        
        onFailure: (err) => {
          return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
        },
      });
    });
  }

  //로그인
  app.get('/account/login', async function(req, res) {
    const result = await signIn("seri1749@naver.com","cHpTg|f5")
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      // User was signed up by an admin and must provide new
      // password and required attributes, if any, to complete
      // authentication.
  
      // the api doesn't accept this field back
      delete userAttributes.email_verified;
  
      // unsure about this field, but I don't send this back
      delete userAttributes.phone_number_verified;
  
      // Get these details and call
      cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
  }
  var params = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ClientId: 'your_own3j6...0obh',
    ChallengeResponses: {
      USERNAME: 'seri1749@naver.com',
      NEW_PASSWORD: 'Xptmxmdyd11!'
    },
    Session: 'xxxxxxxxxxZDMcRu-5u...sCvrmZb6tHY'
  };
  
  cognitoidentityserviceprovider.respondToAuthChallenge(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
    res.send(result);
  });
  
  // 로그아웃
  // function signOut(email, password) {
  //   return new Promise((resolve) => {
  //     getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
  //       onSuccess: (result) => {
  //         const token = {
  //           accessToken: result.getAccessToken().getJwtToken(),
  //           idToken: result.getIdToken().getJwtToken(),
  //           refreshToken: result.getRefreshToken().getToken(),
  //         }  
  //         return resolve({ statusCode: 200, response: AwsConfig.decodeJWTToken(token) });
  //       },
        
  //       onFailure: (err) => {
  //         return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
  //       },
  //     });
  //   });
  // }

  // app.get('/account/logout', async function(req, res) {
  //   const result = await signOut("seri1749@naver.com","cHpTg|f5")
  //   res.send(result);
  // });
 
//비밀번호 재설정1
// cognitoUser.completeNewPasswordChallenge(password, null, {
//   onSuccess: function(result) {
//   console.log(result)
//   },
//   onFailure: function(error) {
//   console.error(error.message)
//   }
//   });
//   //비밀번호 재설정2
//   app.get ('/account/newpassword', async function(req, res){
//     export function resetPassword(username)})
//     // const poolData = { UserPoolId: xxxx, ClientId: xxxx };
//     // userPool is const userPool = new AWSCognito.CognitoUserPool(poolData);
  
//     // setup cognitoUser first
//     cognitoUser = new AWSCognito.CognitoUser({
//         Username: "seri1749@naver.com",
//         Pool: userPool
//     }
//   );

//     // 비밀번호 잊어버렸을때
//     cognitoUser.forgotPassword({
//       onSuccess: function(result) {
//           console.log('call result: ' + result);
//       },
//       onFailure: function(err) {
//           alert(err);
//       },
//       inputVerificationCode() { // this is optional, and likely won't be implemented as in AWS's example (i.e, prompt to get info)
//           var verificationCode = prompt('Please input verification code ', '');
//           var newPassword = prompt('Enter new password ', '');
//           cognitoUser.confirmPassword(verificationCode, newPassword, this);
//       }
//   });


// // confirmPassword can be separately built out as follows...  
// export function confirmPassword(username, verificationCode, newPassword) {
//   cognitoUser = new AWSCognito.CognitoUser({
//       Username: username,
//       Pool: userPool
//   });

//   return new Promise((resolve, reject) => {
//       cognitoUser.confirmPassword(verificationCode, newPassword, {
//           onFailure(err) {
//               reject(err);
//           },
//           onSuccess() {
//               resolve();
//           },
//       });
//   });
// }



//토큰 처리
// var params = {
//   ClientId: 'STRING_VALUE', /* required */
//   Token: 'STRING_VALUE', /* required */
//   ClientSecret: 'STRING_VALUE'
// };
// cognitoidentityserviceprovider.revokeToken(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

//암호해쉬처리
// {
//   "AuthParameters" : {
//      "USERNAME" : "...",
//      "PASSWORD" : "...",
//      "SECRET_HASH" : "..."
//   },
//   "AuthFlow" : "USER_PASSWORD_AUTH",
//   "ClientId" : "..."
// }
