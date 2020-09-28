def _delete_collection(collection_reference, batch_size):
    docs = collection_reference.limit(batch_size).get()
    deleted = 0
    for doc in docs:
        print(doc)
        doc.reference.delete()
        deleted += 1
    if deleted >= batch_size:
        return _delete_collection(collection_reference, batch_size)
