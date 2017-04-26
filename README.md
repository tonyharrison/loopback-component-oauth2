#This Branch (userlogin-email-verification)
Has a modified **userLogin** function in *lib/oauth2-loopback.js* the include a check of the 
emailVerified property of user model.

To enable the check set the property **userEmailVerificationRequired**  to true the components config
   ie: **(server/lib/component-config.json)**

eg:

    {
      "loopback-component-oauth2": {
        ...
        "userEmailVerificationRequired":true
      }
    }
