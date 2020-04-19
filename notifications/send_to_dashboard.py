import firebase_admin
from firebase_admin import firestore
from dotenv import load_dotenv

load_dotenv()

try:
    firebase_admin.initialize_app()
except:
    pass

def send_to_dashboard(customerUID, notification):
    db = firestore.client()
    notifications_reference = db.collection("customers")\
        .document(customerUID)\
        .collection("notifications")
    notifications_reference.add(notification)
