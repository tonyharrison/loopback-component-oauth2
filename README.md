#This Branch (userlogin-email-verification)
Has a modified **userLogin** function in *lib/oauth2-loopback.js* the include a check of the 
emailVerified property of if the *Model Config* for User (or extension thereof) has emailVerificationRequired 
set to true
