import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 6500;

app.use(express.json());

const buildpath = path.join(__dirname, "build");
if (fs.existsSync(buildpath)) {
  app.use(express.static(buildpath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(buildpath, "index.html"));
  });
}

app.get("/api/test",(req,res)=>{
    res.json({message:"hello from /api/test !"})
})

app.use((req,res)=>{
    res.status(404).send("404 page not found")
})
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("500 internal sever error")
})

app.listen(PORT,()=>{
    console.log(`sever is running at ${PORT}`)

})