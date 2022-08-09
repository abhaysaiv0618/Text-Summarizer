from cgitb import text
import json, sys
from tokenize import Number
from flask import request
from flask import Flask, render_template
from backend import summarize

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test():
    output = request.get_json()
    result = json.loads(output)
    summary = summarize.summarize(result['text'], int(result['length']), result['language'])
    # print(summary)
    return summary

if __name__ == "__main__":
   app.run(debug=True)