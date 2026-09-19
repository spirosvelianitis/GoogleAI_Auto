import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Blue Diamon Auto API", timestamp: new Date().toISOString() });
  });

  // Google Docs live inventory fetch endpoint
  app.get("/api/docs/fetch", async (req, res) => {
    const docQuery = (req.query.doc as string || req.query.url as string || req.query.id as string || "").trim();

    // Helper to extract doc ID if a full URL is provided
    let docId = docQuery;
    const match = docQuery.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      docId = match[1];
    }

    if (!docId) {
      return res.status(400).json({
        error: "Missing Google Doc ID or URL",
        hint: "Provide a public Google Doc link (e.g., https://docs.google.com/document/d/DOC_ID/edit) or ID."
      });
    }

    try {
      // Attempt to fetch public export text
      const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
      const response = await fetch(exportUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) BlueDiamonAuto/1.0"
        }
      });

      if (!response.ok) {
        // May be a published web doc or require permissions
        const pubUrl = docQuery.includes("/pub") ? docQuery : `https://docs.google.com/document/d/${docId}/pub`;
        const pubResp = await fetch(pubUrl);
        if (!pubResp.ok) {
          return res.status(422).json({
            error: "Unable to load Google Doc export directly. Ensure the Google Doc has General Access set to 'Anyone with the link can view' or is 'Published to web'.",
            status: response.status,
            docId
          });
        }
        const htmlText = await pubResp.text();
        return res.json({
          success: true,
          source: "html_pub",
          docId,
          rawText: htmlText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "),
          fetchedAt: new Date().toISOString()
        });
      }

      const rawText = await response.text();
      return res.json({
        success: true,
        source: "direct_export_txt",
        docId,
        rawText,
        fetchedAt: new Date().toISOString()
      });
    } catch (err: any) {
      console.error("Error fetching Google Doc:", err.message);
      return res.status(500).json({
        error: `Failed to fetch Google Doc: ${err.message}`,
        hint: "Verify internet connectivity and that the Google Doc sharing settings are public."
      });
    }
  });

  // Contact / Test drive inquiry submission
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, vehicleId, vehicleName, message, type, preferredDate, preferredTime } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ error: "Name and either email or phone number are required." });
    }

    const inquiryId = "BDA-" + Math.floor(100000 + Math.random() * 900000);
    console.log(`[INQUIRY RECEIVED] #${inquiryId} from ${name} (${email || phone}) for ${vehicleName || "General Inquiry"}`);

    return res.json({
      success: true,
      inquiryId,
      message: `Thank you, ${name}! Your inquiry has been received by Blue Diamon Auto. A specialist will contact you shortly.`,
      receivedData: {
        inquiryId,
        name,
        email,
        phone,
        vehicleId,
        vehicleName,
        message,
        type: type || "general",
        preferredDate,
        preferredTime,
        receivedAt: new Date().toISOString()
      }
    });
  });

  // Vite middleware in dev; static dist in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Blue Diamon Auto server running on http://localhost:${PORT}`);
  });
}

startServer();
