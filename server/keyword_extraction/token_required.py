from flask import request
from functools import wraps

def bearer_token(f):
   @wraps(f)
   def decorator(*args, **kwargs):

      token = None

      if 'x-access-tokens' in request.headers:
         token = request.headers['x-access-tokens']

      if not token:
         return jsonify({'message': 'a valid token is missing'})

      try:
         data = jwt.decode(token, app.config[SECRET_KEY])
         current_user = Users.query.filter_by(
             public_id=data['public_id']).first()
      except:
         return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
   return decorator
