import createMailTransporter from './createMailTransporter';

const sendVerificationMail = (user:any) => {
  console.log(user);
  
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"Questionnaire NWS" <quest_bb_nws@outlook.fr>',
    to: user.email,
    subject: 'Verify your email...',
    html: `<p>Hello ${user.name}, verify your email by clicking this link...</p>
          <a href='${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>Verify Your
          Email</a>`,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
  if(error) {
    console.log(error);
  } else  {
    console.log(`Verification email sent to ${user.email}`);
    }
  });
};

export default sendVerificationMail;

