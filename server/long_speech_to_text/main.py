from google.cloud import speech_v1
from google.cloud.speech_v1p1beta1 import enums
import os
from flask import abort, Response


def get_bearer_token(request):
    bearer_token = request.headers.get("Authorization", None)
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


def long_speech_to_text(request):
    if request.method == "OPTIONS":
        headers = {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "GET",
            'Access-Control-Allow-Headers': "Authorization",
            'Access-Control-Allow-Credentials': "true",
        }

        return '', 204, headers
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    if request.method != "GET":
        abort(Response("Only GET method is allowed", 405, headers))
    bearer_token = get_bearer_token(request)
    secret_key = os.environ.get("SECRET_KEY")
    if bearer_token != secret_key:
        abort(Response("Invalid bearer token", 401, headers))
    try:
        client = speech_v1.SpeechClient()
        sample_rate_hertz = int(request.args["rate"])
        language_code = request.args["language"]
        storage_uri = request.args["uri"]
        bucket_name = os.environ.get("BUCKET_NAME")
        storage_uri = f"gs://{bucket_name}/{storage_uri}"
        encoding = enums.RecognitionConfig.AudioEncoding.MP3
        config = {
            "sample_rate_hertz": sample_rate_hertz,
            "language_code": language_code,
            "encoding": encoding,
        }
        audio = {"uri": storage_uri}

        operation = client.long_running_recognize(config, audio)

        print("Processing...")
        response = operation.result()
        best_alternatives = list()
        for result in response.results:
            alternative = result.alternatives[0]
            best_alternatives.append(alternative.transcript)
        print("Done processing.")
        transcript = " ".join(best_alternatives)
        return Response(transcript, 200, headers)
    except Exception as e:
        print(f"Error: {e}")
        return Response("Fail", 500, headers)
