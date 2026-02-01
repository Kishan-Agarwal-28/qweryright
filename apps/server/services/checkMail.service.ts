import { VerifaliaRestClient, BearerAuthenticator } from "verifalia";
import domains from "./tempmail.json" with { type: "json" };
import z from "zod";
import { env } from "@/env.js";

const emailSchema = z.string().email();
type Email = z.infer<typeof emailSchema>;

export const checkEmail = async (email: Email) => {
  const safeEmail = emailSchema.parse(email);
  const domain = safeEmail.split("@")[1] ?? "";

  if ((domains as string[]).includes(domain)) {
    throw new Error("Email is disposable");
  }

  const verifalia = new VerifaliaRestClient({
    username: "ignored",
    authenticator: new BearerAuthenticator(
      env.VERIFALIA_EMAIL,
      env.VERIFALIA_PASSWORD,
    ),
  });

  const result = await verifalia.emailValidations.submit(safeEmail);
  const entry = result?.entries[0];

  if (
    (entry?.classification as string) === "Deliverable" ||
    (entry?.status as string) === "Success"
  ) {
    return true;
  } else {
    throw new Error("Email is not deliverable");
  }
};
