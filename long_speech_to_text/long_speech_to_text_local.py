from google.cloud import speech_v1
from google.cloud.speech_v1p1beta1 import enums
import io
import sys

def sample_long_running_recognize(local_file_path):
    """
    Transcribe a long audio file using asynchronous speech recognition

    Args:
      local_file_path Path to local audio file, e.g. /path/audio.wav
    """

    client = speech_v1.SpeechClient()
    language_code = "es-EC"
    sample_rate_hertz = 16000

    encoding = enums.RecognitionConfig.AudioEncoding.MP3
    config = {
        "language_code": language_code,
        "sample_rate_hertz": sample_rate_hertz,
        "encoding": encoding,
    }
    with io.open(local_file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}

    operation = client.long_running_recognize(config, audio)

    print(u"Waiting for operation to complete...")
    response = operation.result()

    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))


if __name__ == '__main__':
    sample_long_running_recognize(*sys.argv[1:])
