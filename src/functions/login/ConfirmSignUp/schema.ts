export default {
  type: "object",
  properties: {
    email: { type: "string" },
    code: { type: "number" },
  },
  required: ["email", "code"],
} as const;
