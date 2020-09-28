from google.cloud import speech_v1
from google.cloud.speech_v1p1beta1 import enums
import os
import sys

def _get_transcript(storage_uri, language_code, sample_rate_hertz):
    """
    Transcribe long audio file from Cloud Storage using asynchronous speech
    recognition

    Args:
      storage_uri URI for audio file in Cloud Storage, e.g. gs://[BUCKET]/[FILE]
    """
    bucket_name = os.environ.get("BUCKET_NAME")
    storage_uri = f"gs://{bucket_name}/{storage_uri}"
    client = speech_v1.SpeechClient()
    encoding = enums.RecognitionConfig.AudioEncoding.MP3
    config = {
        "sample_rate_hertz": sample_rate_hertz,
        "language_code": language_code,
        "encoding": encoding,
    }
    audio = {"uri": storage_uri}
    operation = client.long_running_recognize(config, audio)
    print(u"Waiting for operation to complete...")
    response = operation.result()
    best_alternatives = list()
    for result in response.results:
        alternative = result.alternatives[0]
        best_alternatives.append(alternative.transcript)
    return " ".join(best_alternatives)

if __name__ == '__main__':
    get_transcript(*sys.argv[1:])
