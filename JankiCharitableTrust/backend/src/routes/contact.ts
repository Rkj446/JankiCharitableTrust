import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

const router = Router();

// In-memory store for messages (replace with database in production)
const messages: any[] = [];

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// POST /api/contact - Submit contact form and send email notification
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().isLength({ min: 5 }).escape(),
    body('message').trim().isLength({ min: 10 }).escape(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = {
      id: messages.length + 1,
      timestamp: new Date(),
      ...req.body,
    };

    messages.push(message);

    const shouldSend = typeof message.message === 'string' && message.message.trim().length > 0;
    const transporter = getTransporter();
    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

    if (shouldSend && transporter && toEmail && fromEmail) {
      const plainText = `New contact message\n\nName: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\nTime: ${message.timestamp}\n\nMessage:\n${message.message}`;
      const html = `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <p><strong>Time:</strong> ${message.timestamp}</p>
        <hr/>
        <p>${message.message}</p>
      `;
      transporter
        .sendMail({
          from: fromEmail,
          to: toEmail,
          subject: `[Contact] ${message.subject}`,
          text: plainText,
          html,
          replyTo: message.email,
        })
        .then(() => {
          res.status(201).json({
            message: 'Message received successfully and email notification sent',
            data: message,
            emailSent: true,
          });
        })
        .catch((err) => {
          console.error('Failed to send contact email:', err);
          res.status(201).json({
            message: 'Message received successfully (email not sent)',
            data: message,
            emailSent: false,
            error: process.env.NODE_ENV === 'development' ? String(err) : undefined,
          });
        });
    } else {
      res.status(201).json({
        message: 'Message received successfully',
        data: message,
        emailSent: false,
      });
    }
  }
);

// GET /api/contact/messages - List all messages (protected route in production)
router.get('/messages', (_req, res) => {
  res.json(messages);
});

export const contactRouter = router;