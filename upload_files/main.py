from google.cloud import storage
from flask import abort, Response
import os
from requests import post

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


def upload_blob(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': ['Authorization', 'Content-Type'],
            'Access-Control-Allow-Credentials': 'true',
        }

        return ('', 204, headers)
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    if request.method != 'POST':
        abort(Response("Only POST method is allowed", 405, headers))
    bearer_token = get_bearer_token(request)
    secret_key = os.environ.get('SECRET_KEY')
    if bearer_token != secret_key:
        abort(Response("Invalid bearer token", 401, headers))
    try:
        print("Processing...")
        bucket_name = request.args['bucket']
        destination_blob_name = request.args['blob']
        source_file = request.files['file']
        source_file.save("/tmp/thisiscool.mp3")
        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_filename("/tmp/thisiscool.mp3")
        post_headers = {'Authorization': f"Bearer {bearer_token}"}
        transcript = post("http://0.0.0.0:8081/", params={"uri": f"gs://{bucket_name}/thisiscool.mp3", "language": "es-EC"}, headers=post_headers)
        return Response(transcript.text, 200, headers)
    except Exception as exception:
        print(exception)
        return Response("Fail", 500, headers)
