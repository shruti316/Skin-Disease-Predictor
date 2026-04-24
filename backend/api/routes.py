from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from core.predictor import predict_skin_disease
from core.schemas import PredictResponse

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


@router.post("/api/predict", response_model=PredictResponse)
async def predict(
    image: UploadFile = File(...),
    age: int = Form(...),
    gender: str = Form(...),
    symptoms: str = Form(...)
):
    try:
        image_bytes = await image.read()

        result = predict_skin_disease(
            image_bytes=image_bytes,
            age=age,
            gender=gender,
            symptoms=symptoms
        )

        return {
            "success": True,
            "message": "Prediction completed successfully",
            "result": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))