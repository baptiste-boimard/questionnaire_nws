import { UserAttributes } from '~/models/user';
import createMailTransporter from './createMailTransporter';


// Fonction d'envoi du mail de vérification qui retourne une promesse
// permet de rendre l'envoi du mail asynchrone
async function sendVerificationMail(user: Omit<UserAttributes, 'id'>) {
  return new Promise((resolve) => {

    const transporter = createMailTransporter();

    const mailOptions = {
      from: '"Questionnaire NWS" <quest_bb_nws@outlook.fr>',
      to: user.email,
      subject: 'Verify your email...',
      html: `<p>Hello, vérifie ton email en cliquant sur ce lien...</p>
            <a href='${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>Verify Your
            Email</a>`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if(error) {
        console.log('EMAI/L ENVOI ERREUR',error);
        
        resolve(false);
      } else  {
        console.log('EMAIL SEND ##############');
        
          resolve(true);
      }
    });
  })
};

export default sendVerificationMail;

