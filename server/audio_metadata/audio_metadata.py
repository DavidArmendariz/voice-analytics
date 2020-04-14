import sys
from mutagen.mp3 import MP3


def audio_metadata(file):
    audio = MP3(file)
    print(f"Audio length in seconds: {audio.info.length}")
    print(f"Sample Rate in Hz: {audio.info.sample_rate}")


if __name__ == '__main__':
    audio_metadata(*sys.argv[1:])
