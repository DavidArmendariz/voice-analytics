import sys
from firebase_admin import firestore


def _store_data(reference, data):
    """
        reference: customers/customerUID/employees/employeeUID/transcriptions
    """
    db = firestore.client()
    customers_collection, customer_uid, employees_collection, employee_uid, transcriptions_collection = reference.split("/")
    data_with_date = {"date": firestore.SERVER_TIMESTAMP}
    data_with_date.update(data)
    db.collection(customers_collection)\
        .document(customer_uid)\
        .collection(employees_collection)\
        .document(employee_uid)\
        .collection(transcriptions_collection)\
        .add(data_with_date)
    print(f"Sucessfully stored data in {reference}")


if __name__ == '__main__':
    _store_data(*sys.argv[1:])
