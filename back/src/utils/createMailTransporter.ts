const nodemailer = require('nodemailer');

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    // si SMTP ou autre consulter la doc de nodemailer
    service: "hotmail",
    auth: {
      user: 'quest_bb_nws@outlook.fr',
      pass: 'dZQG$*v3aV%:pxH',
    },
  });
  return transporter;
};

export default createMailTransporter;