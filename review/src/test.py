import json


# set path and file name
path = "Documents/project/destiny/review/src/sample1.json"

# write json
data = {}
data['reviewlist'] = []
data['reviewlist'].append({
    "user": "Eukgun",
    "movie": "Harry Potter",
    "review": {
                "comment": "Hmmm",
                "rate": 3
          }
          })

with open(path, 'w') as outfile:
    json.dump(data, outfile, indent=4)