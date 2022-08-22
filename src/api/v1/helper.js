import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "zohaib5424@gmail.com",
    clientId:
      "1089287660396-erp0nm9b0u7dc2lhoiv8bl4r296gglha.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04C6uX5Xs-mgKCgYIARAAGAQSNwF-L9IrXYWrfNQpGkTFUojh7haPUbGHZsZlwYNTLLoraxsFMJzBRNlhtMAM5s2SP3fMUBGLvv0",
  },
});

export const sendEmail = (userData) => {
  console.log(userData);
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: "zohaib5424@gmail.com",
        to: userData.email,
        subject: "Welcome Email",
        text: `Hello ${userData.name}
            Your Account is Created. Welcome to Vehical Managment, you'r successfully Sign Up 
            Your Password is
            ${userData.password}`,
      },
      (error, info) => {
        if (error) {
          console.log("Error", error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info.response);
        }
      }
    );
  });
};
