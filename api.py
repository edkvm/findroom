from flask import Flask, request, make_response, current_app
import os
import sqlite3
from datetime import timedelta
from functools import update_wrapper
from api_lib import ListParser
import json

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='static', static_url_path='')

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator




@app.route('/api/apartments', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def list_apartments():
    
    with open(os.path.join("static", "apartments.json")) as f:
     json_data = f.read()
    
    return json_data

@app.route('/api/list/<loc>/<sub_loc>/<section>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def list(loc="newyork", sub_loc="brk",section="sub"):
	parser = ListParser(loc)

	apt_list = parser.get_list(sub_loc,section)

	return json.dumps(apt_list)

if __name__ == "__main__":
    app.debug = True
    app.run()