# Voice analytics

This project uses Google Cloud Functions that serve specific purposes

## Local development

Set up a virtual environment and install the dependencies of `requirements.txt`:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Testing Cloud functions locally

```python
functions-framework --target="FUNCTION_NAME" --debug --source="RELATIVE_PATH_TO_MAIN" --port="PORT"
```

Example:

```python
functions-framework --target=upload_blob --debug --source=upload_blob/main.py --port=8080
```

## Deploying Google Cloud Functions

```python
gcloud functions deploy [FUNCTION_NAME] --env-vars-file .env.yaml --runtime python37 --trigger-http
```

Example:

```bash
gcloud functions deploy upload_blob --env-vars-file .env.yaml --runtime python37 --trigger-http
```
