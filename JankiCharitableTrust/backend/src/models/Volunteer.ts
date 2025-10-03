import mongoose, { Schema } from 'mongoose';

const VolunteerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String },
    location: { type: String },
    availability: { type: String },
    message: { type: String },
    status: { type: String, enum: ['new', 'reviewed', 'contacted'], default: 'new' },
  },
  { timestamps: true }
);

export const VolunteerModel = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);




