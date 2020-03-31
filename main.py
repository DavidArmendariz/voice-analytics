from upload_local_files.main import upload_blob
from speech_to_text.main import speech_to_text
from long_speech_to_text.main import long_running_recognize
from google.cloud import storage
import os

bucket = os.getenv("BUCKET_NAME")
audio = "monologue.mp3"
language_code = "es-EC"
storage_uri = "gs://voice-8ddf6.appspot.com/monologue.mp3"

if __name__ == "__main__":
    upload_blob(bucket, audio, "monologue.mp3")
    # speech_to_text(storage_uri, language_code)
    long_running_recognize(storage_uri, language_code)
