import time
import requests
import json
from flask import Flask
import os
from flask import render_template

# app = Flask(__name__)
app = Flask(__name__, static_url_path='/static')
target_website = "http://flaskosa.herokuapp.com/"

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/')
def get_name():
    file_path = os.path.join('build', 'index.html')
    print("-----------------------")
    print(file_path)
    print("-----------------------")
    return render_template('index.html')
    # return app.send_static_file(file_path)

@app.route('/cmd')
def cmd():
    req = requests.get(target_website + "cmd")
    text = requests.get(target_website + "cmd").content
    res = {'data': str(text)}
    return res
    # return requests.get(target_website + "cmd").content
    

@app.route('/cmd/IDN')
def cmd_idn():
    return requests.get(target_website + 'cmd/IDN').content

@app.route('/cmd/LIMIT')
def limit():
    return requests.get(target_website + 'cmd/LIMIT').content

@app.route('/cmd/LIMIT/[min max]')
def min_max_limit():
    return requests.get(target_website + 'cmd/LIMIT').content

@app.route('/cmd/ECHO/string')
def echo():
    return requests.get(target_website + 'cmd/ECHO/string').content

@app.route('/cmd/PING')
def ping():
    return requests.get(target_website + 'cmd/PING').content

@app.route('/cmd/START')
def start():
    return requests.get(target_website + 'cmd/START').content

@app.route('/cmd/STOP')
def stop():
    return requests.get(target_website + 'cmd/STOP').content

@app.route('/cmd/SINGLE')
def single():
    return requests.get(target_website + 'cmd/SINGLE').content

@app.route('/cmd/STATE')
def state():
    return requests.get(target_website + 'cmd/STATE').content

@app.route('/cmd/TRACE')
def trace():
    return requests.get(target_website + 'cmd/TRACE').content
