import sys
import firebase_admin
from firebase_admin import firestore


def store_transcriptions(reference, transcription):
    """
        reference: /employees/INjzmr37Ik1fHZMGl0kO/transcriptions
    """
    firebase_admin.initialize_app()
    db = firestore.client()
    try:
        employees_collection, uid, transcription_collection = reference.split("/")
    except Exception as e:
        print(f"Error: {e}")
    data = {"transcription": transcription, "date": firestore.SERVER_TIMESTAMP}
    db.collection(employees_collection).document(
        uid).collection(transcription_collection).add(data)
    print(f"Sucessfully stored transcription in {reference}")


if __name__ == '__main__':
    store_transcriptions(*sys.argv[1:])
