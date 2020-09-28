import sys
from firebase_admin import firestore
from .delete_collection import _delete_collection
from .delete_document import _delete_document


def _delete_employee(reference, batch_size=50):
    """
        reference: customers/customerUID/employees/employeeUID/transcriptions
    """
    db = firestore.client()
    customers_collection, customer_uid, employees_collection, employee_uid, transcriptions_collection = reference.split(
        "/")
    transcriptions_reference = db.collection(customers_collection)\
        .document(customer_uid)\
        .collection(employees_collection)\
        .document(employee_uid)\
        .collection(transcriptions_collection)
    employee_reference = db.collection(customers_collection)\
        .document(customer_uid)\
        .collection(employees_collection)\
        .document(employee_uid)
    try:
        _delete_collection(transcriptions_reference, batch_size)
        _delete_document(employee_reference)
    except Exception as e:
        print(f"Error deleting: {e}")


if __name__ == '__main__':
    _store_data(*sys.argv[1:])
