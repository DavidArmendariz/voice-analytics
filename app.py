import os
from flask import Flask, request, jsonify
from utils.token_required import token_required
from dotenv import load_dotenv
from flask_cors import CORS
import firebase_admin
from upload_blob.upload_blob import _upload_blob
from audio_metadata.audio_metadata import _audio_metadata
from get_transcription.get_transcript import _get_transcript
from get_keywords.get_keywords import _get_keywords
from store_data.store_data import _store_data
from content_classifier.content_classifier import _content_classifier
from get_translation.get_translation import _get_translation
from get_sentiment.get_sentiment import _get_sentiment
from store_employee.store_employee import _store_employee

load_dotenv()
try:
    firebase_admin.initialize_app()
except ValueError:
    print("Firebase session already initialized")

app = Flask(__name__)
CORS(app)


@app.route("/get_audio_metadata", methods=["POST"])
@token_required
def get_audio_metadata():
    source_file = request.files["file"]
    temp_path = "/tmp/audio.mp3"
    source_file.save(temp_path)
    path_to_file = os.path.abspath(temp_path)
    metadata = _audio_metadata(source_file)
    return jsonify(metadata)


@app.route("/upload_blob", methods=["POST"])
@token_required
def upload_blob():
    bucket_name = os.environ.get("BUCKET_NAME")
    destination_blob = request.args["blob"]
    source_file = request.files["file"]
    temp_path = "/tmp/audio.mp3"
    source_file.save(temp_path)
    _upload_blob(bucket_name, temp_path, destination_blob)
    return "Uploaded blob succesfully", 200


@app.route("/get_transcription", methods=["POST"])
@token_required
def get_transcript():
    data = request.get_json()
    storage_uri = data.get("blob")
    language_code = data.get("languageCode")
    sample_rate_hertz = int(data.get("sampleRate"))
    transcription = _get_transcript(
        storage_uri, language_code, sample_rate_hertz)
    return jsonify({"transcription": transcription})


@app.route("/get_keywords", methods=["POST"])
@token_required
def get_keywords():
    data = request.get_json()
    transcription = data.get("transcription")
    language_code = data.get("languageCode")
    language_code = language_code.split("-")[0]
    keywords = _get_keywords(transcription, language_code)
    return jsonify(keywords)


@app.route("/store_data", methods=["POST"])
@token_required
def store_data():
    data = request.get_json()
    reference = data.get("reference")
    del data["reference"]
    _store_data(reference, data)
    return "Stored data in Firestore succesfully", 200


@app.route("/content_classifier", methods=["POST"])
@token_required
def content_classifier():
    data = request.get_json()
    text = data.get("transcription")
    language_code = data.get("languageCode")
    if language_code:
        language_code = language_code.split("-")[0]
    categories = _content_classifier(text, language_code)
    return jsonify(categories)


@app.route("/get_translation", methods=["POST"])
@token_required
def get_translation():
    data = request.get_json()
    text = data.get("transcription")
    translation = _get_translation(text)
    return jsonify({"translation": translation})


@app.route("/get_sentiment", methods=["POST"])
@token_required
def get_sentiment():
    data = request.get_json()
    text = data.get("transcription")
    language_code = data.get("languageCode")
    if language_code:
        language_code = language_code.split("-")[0]
    result = _get_sentiment(text, language_code)
    return jsonify(result)


@app.route("/store_employee", methods=["POST"])
@token_required
def store_employee():
    data = request.get_json()
    reference = data.get("reference")
    del data["reference"]
    _store_employee(reference, data)
    return "OK", 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get('PORT', 8080)))
