import sys
from mutagen.mp3 import MP3


def _audio_metadata(file):
    audio = MP3(file)
    metadata = {"audioLength": audio.info.length, "sampleRate": audio.info.sample_rate}
    return metadata

if __name__ == '__main__':
    audio_metadata(*sys.argv[1:])
