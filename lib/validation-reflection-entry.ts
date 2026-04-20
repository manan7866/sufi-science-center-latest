import { z } from "zod";

const badWords = [
  "sex", "xxx", "porn",
  "gali", "haram", "bc", "mc",
  "fuck", "shit",
  "lund", "chut"
];

const urlRegex = /(https?:\/\/|www\.)/i;

export const reflectionSchema = z.object({
  userId: z.string().uuid(),
  surahNumber: z.number().min(1),

  reflectionText: z.string()
    .min(20, "Minimum 20 characters required")
    .max(80, "Maximum 80 characters allowed")
    .refine((val) => !urlRegex.test(val), {
      message: "Links are not allowed"
    })
    .refine((val) => {
      const lower = val.toLowerCase();
      return !badWords.some(word => lower.includes(word));
    }, {
      message: "Inappropriate language is not allowed"
    })
});