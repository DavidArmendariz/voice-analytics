import firebase_admin
from firebase_admin import firestore
from dotenv import load_dotenv

load_dotenv()

try:
    firebase_admin.initialize_app()
except:
    pass

db = firestore.client()
customers = []
customers_reference = db.collection("customers")
docs = customers_reference.stream()

for doc in docs:
    data = {"uid": doc.id}
    data.update(doc.to_dict())
    customers.append(data)
