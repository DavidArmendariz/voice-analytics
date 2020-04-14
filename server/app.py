from flask import Flask, jsonify
from keyword_extraction.keyword_extraction_multi_rake import example
import os

app = Flask(__name__)


@app.route('/get_keywords', methods=['GET'])
def get_all_users():
    return jsonify({"keywords": example()})


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
