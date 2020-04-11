from google.cloud import storage
import sys


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """
    Uploads a file to the bucket.
    Example:
    bucket_name = "voice-8ddf6.appspot.com"
    source_file_name = "small_audio.mp3"
    destination_blob_name = "employees/123456/file.mp3"
    """
    try:
        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_filename(source_file_name)
        print(f"File {source_file_name} uploaded as {destination_blob_name}.")
    except Exception as exception:
        print(exception)


if __name__ == '__main__':
    upload_blob(*sys.argv[1:])
