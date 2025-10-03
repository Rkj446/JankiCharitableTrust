import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import { VolunteerModel } from '../models/Volunteer';

const router = Router();

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim().escape(),
    body('location').optional().trim().escape(),
    body('availability').optional().trim().escape(),
    body('message').optional().trim().escape(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
    const transporter = getTransporter();

    // Persist to MongoDB if configured
    try {
      await VolunteerModel.create(req.body);
    } catch (err) {
      console.error('Failed to store volunteer:', err);
    }

    if (transporter && toEmail && fromEmail) {
      const v = req.body || {};
      const text = `Volunteer request\n\nName: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '-'}\nLocation: ${v.location || '-'}\nAvailability: ${v.availability || '-'}\n\nMessage:\n${v.message || '-'}`;
      try {
        await transporter.sendMail({
          from: fromEmail,
          to: toEmail,
          subject: `[Volunteer] ${v.name}`,
          text,
          replyTo: v.email,
        });
        return res.status(201).json({ message: 'Volunteer request received', emailSent: true });
      } catch (err) {
        console.error('Volunteer email failed:', err);
        return res.status(201).json({ message: 'Volunteer request received (email not sent)', emailSent: false });
      }
    }

    return res.status(201).json({ message: 'Volunteer request received', emailSent: false });
  }
);

export const volunteerRouter = router;



