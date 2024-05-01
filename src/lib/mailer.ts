import nodemailer from 'nodemailer';
import prisma from '@/db';

const randomCodeGenerate = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const verificationCode = randomCodeGenerate();

    if (emailType === 'VERIFY') {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          verificationCode: String(verificationCode),
          verificationCodeExpiry: new Date(Date.now() + 3600000),
        },
      });

      var transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 2525,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      const mailOptions = {
        from: process.env.NODEMAILER_FROM,
        to: String(email),
        subject: `${verificationCode} is your verification code`,
        html: `<div>
        <p>There’s one quick step you need to complete before creating your X account. Let’s make sure this is the right email address for you — please confirm this is the right address to use for your new account.<p/>
        <br>
        <p>Please enter this verification code to get started on X:</P>
        <br>
        Verification Code: <h2>${verificationCode}</h2>
        <br>
        <p>Verification codes expire after one hour.</p>
        <br>
        <p>Thanks X<p/>
        </div> `,
      };
      const mailResponse = await transporter.sendMail(mailOptions);
      return mailResponse;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
