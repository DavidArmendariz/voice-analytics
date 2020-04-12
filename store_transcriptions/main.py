from google.cloud import storage
from flask import abort, Response
import os
import firebase_admin
from firebase_admin import firestore


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


def store_transcriptions(request):
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
        try:
            firebase_admin.initialize_app()
        except:
            print("Firebase App already initialized")
        db = firestore.client()
        request_json = request.get_json()
        transcription = request_json["transcription"]
        reference = request_json["reference"]
        audio_length = request_json["length"]
        customer_collection, customer_uid, employees_collection, employee_uid, transcription_collection = reference.split(
            "/")
        data = {"transcription": transcription,
                "date": firestore.SERVER_TIMESTAMP,
                "audioLength": audio_length}
        db.collection(customer_collection)\
        .document(customer_uid)\
        .collection(employees_collection)\
        .document(employee_uid)\
        .collection(transcription_collection)\
        .add(data)
        print(f"Sucessfully stored transcription in {reference}")
        return Response("OK", 200, headers)
    except Exception as e:
        print(f"Error: {e}")
        return Response("Fail", 500, headers)
