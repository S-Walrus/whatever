import json
from flask import request, Flask
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r'/stupid/*': {'origins': '*'}})

@app.route('/stupid/getComment', methods=['GET'])
def send_comment():
    with open('message') as f:
        message = f.read()
    return json.dumps({
        'text': message
    })

@app.route('/stupid/updateComment', methods=['POST'])
def update_comment():
    message = str(request.data, encoding='utf-8')
    with open('message', 'w') as f:
        f.write(message)
    return json.dumps({
        'response': 'ok'
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0')
