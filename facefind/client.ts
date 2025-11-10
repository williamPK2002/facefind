import fs from "fs";
import axios from "axios";
import FormData from "form-data";

console.log("🔹 Starting TypeScript embedder client...");

async function testEmbed() {
  console.log("🚀 Running TS client...");

  const url = "http://127.0.0.1:8000/embed";
  const imagePath = "./testImg/imgT_0.jpg";

  if (!fs.existsSync(imagePath)) {
    console.error("❌ Image not found:", imagePath);
    return;
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(imagePath));

  try {
    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 15000,
    });

    console.log("✅ Response:", response.status);
    console.log("📦 Data:", response.data);
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    if (err.response) {
      console.error("Server replied:", err.response.data);
    }
  }
}

testEmbed();
