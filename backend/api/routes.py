from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from core.predictor import predict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/")
def home():
    return {"message": "Backend is running"}


@router.get("/api/health")
def health():
    return {"status": "healthy"}


@router.get("/api/diseases")
def diseases():
    return {
        "diseases": [
            "Acne",
            "Eczema",
            "Psoriasis",
            "Melanoma",
            "Ringworm"
        ]
    }


@router.post("/predict")
async def predict_endpoint(
    file: UploadFile = File(...)
):
    try:
        logger.info(f"Received request to /predict. File name: {file.filename}, Content type: {file.content_type}")
        
        if not file:
            raise HTTPException(status_code=400, detail="No file uploaded")
            
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

        image_bytes = await file.read()
        logger.info("Starting model inference")

        label, confidence, probabilities = predict(image_bytes)

        response = {
            "prediction": label,
            "confidence": confidence,
            "probabilities": probabilities
        }
        logger.info(f"Sending response: {response}")
        return response

    except HTTPException as he:
        logger.error(f"HTTPException: {str(he)}")
        raise he
    except Exception as e:
        logger.error(f"Internal Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Backend failure during prediction")