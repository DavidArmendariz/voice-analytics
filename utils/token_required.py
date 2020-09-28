from flask import request, abort
from functools import wraps
import os

def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
      bearer_token = request.headers.get("Authorization", None)
      error = None
      if not bearer_token:
         return "No bearer token in headers", 401
      parts = bearer_token.split()
      if parts[0] != "Bearer":
         return "Authorization header must start with Bearer", 401
      elif len(parts) == 1:
         return "Token was not found", 401
      elif len(parts) > 2:
         return "Authorization header must be of the form Bearer token", 401
      bearer_token = parts[1]
      if bearer_token != os.environ.get("BEARER_TOKEN"):
         return "Invalid token", 401
      return f(*args, **kwargs)
   return decorator
