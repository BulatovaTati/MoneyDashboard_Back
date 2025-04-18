import { model, Schema } from 'mongoose';

const sessionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    token: { type: String, required: true },
    tokenValidUntil: { type: Date, default: Date.now, expires: '1d' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionsCollection = model('session', sessionsSchema);
