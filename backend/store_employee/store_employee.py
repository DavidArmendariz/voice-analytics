import sys
from firebase_admin import firestore


def _store_employee(reference, data):
    """
        reference: customers/customerUID/employees
    """
    db = firestore.client()
    customers_collection, customer_uid, employees_collection = reference.split(
        "/")
    db.collection(customers_collection)\
        .document(customer_uid)\
        .collection(employees_collection)\
        .add(data)
    print(f"Sucessfully stored new employee in {reference}")


if __name__ == '__main__':
    _store_data(*sys.argv[1:])
