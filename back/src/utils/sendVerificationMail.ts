import createMailTransporter from './createMailTransporter';

type User = {
  email: string,
  name?: string,
  password?: string,
  registred?: boolean,
  emailToken: string
}

// Fonction d'envoi du mail de vérification qui retourne une promesse
// permet de rendre l'envoi du mail asynchrone
async function sendVerificationMail(user:User) {
  return new Promise((resolve) => {

    const transporter = createMailTransporter();

    const mailOptions = {
      from: '"Questionnaire NWS" <quest_bb_nws@outlook.fr>',
      to: user.email,
      subject: 'Verify your email...',
      html: `<p>Hello, vérifie ton mail en cliquant sur ce lien...</p>
            <a href='${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>Verify Your
            Email</a>`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if(error) {
        resolve(false);
      } else  {
          resolve(true);
      }
    });
  })
};

export default sendVerificationMail;

