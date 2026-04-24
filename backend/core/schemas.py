from pydantic import BaseModel
from typing import List


class PredictionResult(BaseModel):
    disease: str
    confidence: float
    recommendations: List[str]
    severity: str


class PredictResponse(BaseModel):
    success: bool
    message: str
    result: PredictionResult