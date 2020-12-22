const config = 
{
   connection:
   {
      mongoUrl: "mongodb+srv://adarelk2:681998ae@cluster0.d4xde.mongodb.net/forum"
   },
   errors:
   {
      userExist : "This username or email already exists in the system.",
      require : "is require.",
      empty : "cannot be an empty field.",
      shouldBe : "should be a type of",
      valid : " must be valid",
      success : "success",
      failed : "failed",
      notFound: "not found."
   },
   status:
   {
      success: 200,
      badRequest: 400,
      created:201,
      internalServerError : 500
   },
   salt:"adar"
}
module.exports = config;
