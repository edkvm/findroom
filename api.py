from flask import Flask, request
# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/js/<path:path>')
def static_proxy_js(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('js', path))


@app.route('/bower_components/<path:path>')
def static_proxy_bower(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('bower_components', path))

if __name__ == "__main__":
    app.run()