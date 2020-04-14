from google.cloud import speech_v1
from google.cloud.speech_v1p1beta1 import enums
import sys

def sample_long_running_recognize(storage_uri):
    """
    Transcribe long audio file from Cloud Storage using asynchronous speech
    recognition

    Args:
      storage_uri URI for audio file in Cloud Storage, e.g. gs://[BUCKET]/[FILE]
    """

    client = speech_v1.SpeechClient()
    sample_rate_hertz = 16000
    language_code = "es-EC"
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

    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))


if __name__ == '__main__':
    sample_long_running_recognize(*sys.argv[1:])
