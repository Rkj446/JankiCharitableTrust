import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);



