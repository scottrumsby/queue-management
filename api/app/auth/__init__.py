from flask import abort
from functools import wraps

def login_required(f):
    """Determines if the access token is valid
    """
    @wraps(f)
    def wrap(*args, **kwargs):
        return f(*args, **kwargs)
        
    return wrap