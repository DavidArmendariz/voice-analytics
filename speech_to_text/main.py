from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1 import enums
from flask import abort, Response
import os


def get_bearer_token(request):
    bearer_token = request.headers.get('Authorization', None)
    if not bearer_token:
        abort(401)
    parts = bearer_token.split()
    if parts[0].lower() != "bearer":
        # authorization header must start with 'Bearer'
        abort(401)
    elif len(parts) == 1:
        # token was not found
        abort(401)
    elif len(parts) > 2:
        # authorization header must be of the form 'Bearer token'
        abort(401)
    bearer_token = parts[1]
    return bearer_token


def speech_to_text(request):
    if request.method != 'POST':
        abort(Response("Only POST method is allowed", 405))
    bearer_token = get_bearer_token(request)
    secret_key = os.environ.get('SECRET_KEY')
    if bearer_token != secret_key:
        abort(Response("Invalid bearer token", 401))
    try:
        print("Processing...")
        storage_uri = request.args.get('uri')
        language_code = request.args.get('language')
        client = speech_v1p1beta1.SpeechClient()
        sample_rate_hertz = 44100
        encoding = enums.RecognitionConfig.AudioEncoding.MP3
        config = {
            "language_code": language_code,
            "sample_rate_hertz": sample_rate_hertz,
            "encoding": encoding,
        }
        audio = {"uri": storage_uri}
        response = client.recognize(config, audio)
        transcript = ""
        for result in response.results:
            alternative = result.alternatives[0]
            transcript += alternative.transcript
        return transcript
    except Exception as exception:
        print(exception)
        return Response("Fail", 500)
