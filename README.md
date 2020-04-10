### Testing Google Cloud Functions
```
functions-framework --target="FUNCTION_NAME" --debug --source="RELATIVE_PATH_TO_MAIN" --port="PORT"
```
#### For uploading the files:
```
functions-framework --target=upload_blob --debug --source=upload_files/main.py --port=8080
```

### Deploying Google Cloud Functions
```
gcloud functions deploy [FUNCTION_NAME] --env-vars-file .env.yaml --runtime python37 --trigger-http
```

#### For uploading the files:
```
gcloud functions deploy upload_blob --env-vars-file .env.yaml --runtime python37 --trigger-http
```


### Bucket name for Dev project
```
gs://voice-8ddf6.appspot.com/
```