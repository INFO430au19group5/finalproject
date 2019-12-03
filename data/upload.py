from pymongo import MongoClient
from pprint import pprint
import uuid

# Connect to MongoDB host, use info430 database and jobs collection
print('Connecting to mongo client...')
client = MongoClient('mongodb+srv://dbUser:dbUser@cluster0-iic9m.mongodb.net/test?retryWrites=true&w=majority')
db = client['info430']
collection = db['jobs']
print('Done connecting.')

# Process entries from text file, each entry is delimited using a '|'
# Create a document for each entry, then add all documents into a collection
many_documents = []
entry_count = 0
print('Processing entries...')
with open('output/entries.txt', mode='r') as file:
    for line in file:
        values = line.split('|')
        if len(values) == 4:
            _id = str(uuid.uuid4())
            document = {
            "_id": _id,
            "company": values[0],
            "position": values[1],
            "salary": int(values[2]),
            "stipend": values[3].strip('\n'),
            "stages": "",
            "process": ""
            }
            many_documents.append(document)
            entry_count += 1
output = collection.insert_many(many_documents)
print(f'Processed {entry_count} entries from text file and uploaded to MongoDB instance.')