// import { Resend } from 'resend';
// import dotenv from 'dotenv'
// dotenv.config()

// if (!process.env.RESEND_API_KEY) {
//     console.log("Provide RESEND_API_KEY in side the .env file")
// }

// // const resend = new Resend(process.env.RESEND_API);
// const resend = new Resend(process.env.EMAIL_API_KEY);


// const sendEmail = async({ sendTo, subject, html }) => {
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'QuickCart <onboarding@resend.dev>',
//             //   from: 'rishabhbaba94@gmail.com',
//             to: sendTo,
//             subject: subject,
//             html: html,
//         });

//         if (error) {
//             return console.error({ error });
//         }

//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default sendEmail




import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

// Constants
const VERIFIED_TEST_EMAIL = 'rishabhbaba94@gmail.com';
const isDevelopment = process.env.NODE_ENV === 'development';

// Validate API key
if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is required in .env file');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        // In development, always send to verified test email
        const recipient = isDevelopment ? VERIFIED_TEST_EMAIL : sendTo;

        const { data, error } = await resend.emails.send({
            // from: 'CampusKart <onboarding@resend.dev>',
            from: "CampusKart <no-reply@campuskart.com>",
            to: recipient,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('Email sending failed:', error);
            throw error;
        }

        console.log(`Email sent successfully to ${recipient}`);
        return data;
    } catch (error) {
        console.error('Email service error:', error);
        throw error;
    }
};

export default sendEmail;