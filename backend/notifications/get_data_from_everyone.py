import firebase_admin
from firebase_admin import firestore
from dotenv import load_dotenv
load_dotenv()

try:
    firebase_admin.initialize_app()
except:
    pass


def get_data_from_everyone(customer_uid, start_date, end_date):
    db = firestore.client()
    employees_uids = list()
    docs = db.collection("customers")\
        .document(customer_uid)\
        .collection("employees")
    data = list()
    for doc in docs.stream():
        employees_uids.append(doc.id)
        for uid in employees_uids:
            data_from_employee = docs\
                .document(uid)\
                .collection("transcriptions")\
                .where("date", ">=", start_date)\
                .where("date", "<=", end_date)\
                .stream()
            for doc in data_from_employee:
                data.append(doc.to_dict())
    return data
