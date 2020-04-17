from firebase_admin import firestore


def _get_analytics_data(customerUID, employeesUID):
    db = firestore.client()
    data = list()
    for employeeUID in employeesUID:
        docs = db.collection("customers").document(
            customerUID).collection("employees").document(employeeUID).collection("transcriptions").stream()
        for doc in docs:
            result = {"uid": doc.id}
            result.update(doc.to_dict())
            data.append(result)
    return data
