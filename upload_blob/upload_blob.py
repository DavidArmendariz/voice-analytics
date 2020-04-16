from google.cloud import storage
import sys


def _upload_blob(bucket_name, source_file_name, destination_blob):
    """
    Uploads a file to the bucket.
    Example:
    bucket_name = "voice-8ddf6.appspot.com"
    source_file_name = "audios/small_audio.mp3"
    destination_blob = "audio_in_storage.mp3"
    """
    try:
        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(destination_blob)
        blob.upload_from_filename(source_file_name)
        print(f"File {source_file_name} uploaded as {destination_blob}.")
    except Exception as exception:
        print("Error", exception)


if __name__ == '__main__':
    upload_blob(*sys.argv[1:])
