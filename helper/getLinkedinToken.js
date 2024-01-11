const axios=require('axios')
let getToken = async (code) => {
  const response = await axios({
    url: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=77u3fa0v6n2ps7&client_secret=5ugB8Pt5dMAQL4uw&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flinkedin%2Fcallback`,
    method: "get",
  });
  return response;
};
module.exports=getToken