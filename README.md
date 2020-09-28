### Bucket name for Dev project
```
gs://voice-8ddf6.appspot.com/
```

### Testing Google Cloud Functions
```
functions-framework --target="FUNCTION_NAME" --debug --source="RELATIVE_PATH_TO_MAIN" --port="PORT"
```
#### For uploading the files:
```
functions-framework --target=upload_blob --debug --source=upload_blob/main.py --port=8080
```
#### For processing long audios:
```
functions-framework --target=long_speech_to_text --debug --source=long_speech_to_text/main.py --port=8081
```
#### For storing transcripts:
```
functions-framework --target=store_transcriptions --debug --source=store_transcriptions/main.py --port=8082
```
#### For processing metadata:
```
functions-framework --target=audio_metadata --debug --source=audio_metadata/main.py --port=8083
```
#### For extracting keywords:
```
functions-framework --target=keyword_extraction --debug --source=keyword_extraction/main.py --port=8084
```


### Deploying Google Cloud Functions
```
gcloud functions deploy [FUNCTION_NAME] --env-vars-file .env.yaml --runtime python37 --trigger-http
```

#### For uploading the files:
```
gcloud functions deploy upload_blob --env-vars-file .env.yaml --runtime python37 --trigger-http
```
#### For processing the audio:
```
gcloud functions deploy long_speech_to_text --env-vars-file .env.yaml --runtime python37 --trigger-http
```
#### For uploading the transcript:
```
gcloud functions deploy store_transcriptions --env-vars-file .env.yaml --runtime python37 --trigger-http
```
#### For getting the metadata of the audio:
```
gcloud functions deploy audio_metadata --env-vars-file .env.yaml --runtime python37 --trigger-http
```
#### For extracting the keywords of the audio:
```
gcloud functions deploy keyword_extraction --env-vars-file .env.yaml --runtime python37 --trigger-http
```