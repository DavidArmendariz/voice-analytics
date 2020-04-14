from flask import abort, Response
# from rake_nltk import Metric, Rake
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


def keyword_extraction(request):
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
        # request_json = request.get_json()
        # text = request_json["transcription"]
        # language_code = "spanish"
        # rake = Rake(language=language_code, min_length=2, max_length=4)
        # rake.extract_keywords_from_text(text)
        # keywords = rake.get_ranked_phrases_with_scores()
        # keywords_json = dict()
        # for keyword in keywords:
        #     keywords_json[keyword[1]] = keyword[0]
        # keywords_json = json.dumps(keywords_json)
        # return Response(keywords_json, 200, headers)
        return Response("OK", 200, headers)
    except Exception as e:
        print(f"Error: {e}")
        return Response("Fail", 500, headers)
