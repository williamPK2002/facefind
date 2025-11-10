from fastapi import FastAPI, UploadFile
from insightface.app import FaceAnalysis
import numpy as np
import cv2

app = FastAPI(title="Face Embedder Service")

# Initialize InsightFace once
model = FaceAnalysis(name='buffalo_l', root='C:/insightface_models')
model.prepare(ctx_id=0)  # use GPU if available

@app.get("/")
async def root():
    return {"status": "ok", "message": "Face Embedder Service is running"}

@app.post("/embed")
async def embed_face(file: UploadFile):
    """Receive an image, return face embeddings."""
    image_bytes = await file.read()
    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
    faces = model.get(img)

    if not faces:
        return {"error": "No face detected"}

    embeddings = [face.embedding.tolist() for face in faces]
    return {"num_faces": len(faces), "embeddings": embeddings}


#python -m uvicorn face-embedder:app --reload
