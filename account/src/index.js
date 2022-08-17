const express = require('express');
const PORT = process.env.PORT;
const AWS = require("aws-sdk");
app = express();

const USERPOOL_ID = "ap-northeast-2_idgWudxQX";
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region:"ap-northeast-2"
})
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

//
app.get('/', function (req, res) {
    res.send("hello from account service!!");
});

app.get('/login', function (req, res) {
    res.send("login successfully");
});

//client로 요청을 기다린다
app.listen(PORT, function () {
    console.log('server on! ' + PORT);
});

//회원가입
app.get('/account/signup',function(req,res){
    const createUserParams =
      {
        "UserPoolId": USERPOOL_ID,
        "DesiredDeliveryMediums": [ "EMAIL" ],
        "Username": "seri1749@naver.com",
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


    // req.on('data', function(chunk) {
    //   var datalist = JSON.parse(chunk).data;
    //   var userName = datalist[0];
    //   var email = datalist[1];
    //   var givenName = datalist[2];
    //   var familyName = datalist[3];
      
    // });
  })

  //로그인
//   app.get('/account/login', isLoggedIn, function(req, res) {
//     res.sendFile(path.join(__dirname+'/main'));
//     var email = datalist[1];
//   });

// app.get('/account/login',function(req,res){
//     const loginUserParams =
//       {
//         "UserPoolId": USERPOOL_ID,
//         "DesiredDeliveryMediums": [ "EMAIL" ],
//         "Username": "seri1749@naver.com",
//         "UserAttributes":
//         [
//           {
//             "Name": "email",
//             "Value": "seri1749@naver.com" //이 메일로 인증메일이 가기 때문에 잘 적어줘야 한다.
//           },
//           {
//             "Name": "given_name",
//             "Value": "sery"
//           },
//           {
//             "Name": "family_name",
//             "Value": "choi"
//           },
//           {
//             "Name": "phone_number",
//             "Value": "+82"+"1012341234"
//           },
//           {
//             "Name": "email_verified",
//             "Value": "true"
//           }
//         ]
//       };
//       cognitoIdentityServiceProvider.adminCreateUser(createUserParams,function(err,data){
//         if(err)
//         {
//           console.log(err);
//           if(err.message.startsWith('User account already exists')){
//             res.json({code:-1, msg:'이미 존재하는 아이디입니다.'});
//           }else if(err.message.startsWith('An account with the email already exists')){
//             res.json({code:-2, msg:'이미 등록된 이메일 주소입니다.'});
//           }
//         }
//         else
//         {
//           console.log(data);
//           res.json({code:0, msg:'계정 생성 안내 이메일이 발송되었습니다.'});
//         }
//       });