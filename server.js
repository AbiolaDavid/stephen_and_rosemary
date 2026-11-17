import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createClient } from "@supabase/supabase-js";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const websiteDirectory = path.resolve(currentDirectory, "..");
const port = Number(process.env.PORT) || 3000;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) must be configured.",
  );
}

const supabase = createClient(supabaseUrl, supabaseSecretKey);
const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post(
  "/api/messages",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many messages. Please try again later." },
  }),
  async (request, response) => {
    const { name, message } = request.body ?? {};

    if (
      typeof name !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !message.trim() ||
      name.trim().length > 100 ||
      message.trim().length > 3000
    ) {
      return response.status(400).json({
        error: "Please provide a name (up to 100 characters) and a message (up to 3000 characters).",
      });
    }

    const { error } = await supabase.from("wedding_messages").insert({
      name: name.trim(),
      message: message.trim(),
    });

    if (error) {
      console.error("Could not save wedding message:", error.message);
      return response.status(500).json({ error: "Your message could not be saved." });
    }

    return response.status(201).json({ status: "created" });
  },
);

app.get("/", (_request, response) => {
  response.sendFile(path.join(websiteDirectory, "index.html"));
});

app.get(["/style.css", "/script.js"], express.static(websiteDirectory, { index: false }));
app.use("/pictures", express.static(path.join(websiteDirectory, "pictures")));

app.use("/api", (_request, response) => {
  response.status(404).json({ error: "API endpoint not found." });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Wedding website server listening on port ${port}`);
});
