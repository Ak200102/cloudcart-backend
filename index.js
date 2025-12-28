// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import { fileURLToPath } from "url";
// import path from "path";
// import { readdirSync } from "fs";

// import dbConnect from "./config/Mongodb.js";
// import connectCloudinary from "./config/Cloudinary.js";

// const app = express();
// const port = process.env.PORT || 8000;

// /*  CORS (SAFE FOR DEPLOYMENT) */
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow server-to-server & browser requests
//       if (!origin) return callback(null, true);
//       return callback(null, true);
//     },
//     credentials: true,
//   })
// );

// /*  MIDDLEWARE  */
// app.use(express.json());

// /*  ROUTES  */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const routesPath = path.join(__dirname, "routes");

// for (const route of readdirSync(routesPath)) {
//   const module = await import(`./routes/${route}`);
//   app.use("/api", module.default);
// }

// /* SERVER START */
// const startServer = async () => {
//   try {
//     await dbConnect();       // MongoDB
//     connectCloudinary();     // Cloudinary

//     app.listen(port, () => {
//       console.log(` Server running on port ${port}`);
//     });
//   } catch (error) {
//     console.error(" Server startup error:", error);
//     process.exit(1);
//   }
// };

// startServer();
import express from "express";
import "dotenv/config";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { readdirSync } from "fs";

import dbConnect from "./config/Mongodb.js";
import connectCloudinary from "./config/Cloudinary.js";

const app = express();
const port = process.env.PORT || 8000;

/*  CORS */
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow browser + server-to-server requests
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
  })
);

/*  MIDDLEWARE */
app.use(express.json());

/*  HEALTH CHECK (RENDER KEEP ALIVE)  */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/*  ROUTES  */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = path.join(__dirname, "routes");

for (const route of readdirSync(routesPath)) {
  const module = await import(`./routes/${route}`);
  app.use("/api", module.default);
}

/*  SERVER START  */
const startServer = async () => {
  try {
    await dbConnect();        // MongoDB
    connectCloudinary();      // Cloudinary

    app.listen(port, () => {
      console.log(` Server running on port ${port}`);
    });
  } catch (error) {
    console.error(" Server startup error:", error);
    process.exit(1);
  }
};

startServer();