from flask import abort, Response
from mutagen.mp3 import MP3
import os
import json

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


def audio_metadata(request):
    if request.method == "OPTIONS":
        headers = {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "POST",
            'Access-Control-Allow-Headers': ["Authorization", "Content-Type"],
            'Access-Control-Allow-Credentials': "true",
        }

        return '', 204, headers
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    if request.method != "POST":
        abort(Response("Only POST method is allowed", 405, headers))
    bearer_token = get_bearer_token(request)
    secret_key = os.environ.get("SECRET_KEY")
    if bearer_token != secret_key:
        abort(Response("Invalid bearer token", 401, headers))
    try:
        print(request.files)
        source_file = request.files["file"]
        source_file.save("/tmp/audio.mp3")
        audio = MP3("/tmp/audio.mp3")
        metadata = json.dumps({"length": audio.info.length, "rate": audio.info.sample_rate})
        return Response(metadata, 200, headers)
    except Exception as e:
        print(f"Error: {e}")
        return Response("Fail", 500, headers)
