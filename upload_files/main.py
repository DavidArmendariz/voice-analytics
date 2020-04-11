from google.cloud import storage
from flask import abort, Response
import os

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


def upload_blob(request):
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
        print("Uploading...")
        bucket_name = os.environ.get("BUCKET_NAME")
        destination_blob_name = request.args["blob"]
        source_file = request.files["file"]
        print(bucket_name, destination_blob_name)
        # If we want to upload the file as is, we need to save it somewhere. In Google Cloud Functions instances, the only
        # directory where we can save files is /tmp
        source_file.save("/tmp/audio.mp3")
        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_filename("/tmp/audio.mp3")
        # This part of the code is to process the audio
        # post_headers = {'Authorization': f"Bearer {bearer_token}"}
        # transcript = post("http://0.0.0.0:8081/", params={"uri": f"gs://{bucket_name}/thisiscool.mp3", "language": "es-EC"}, headers=post_headers)
        return Response("OK", 200, headers)
    except Exception as e:
        print(f"Error: {e}")
        return Response("Fail", 500, headers)
