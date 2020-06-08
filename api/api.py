import time
import requests
import json
import os
from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')
target_website = "http://flaskosa.herokuapp.com/"

@app.route('/')
def get_name():
    file_path = os.path.join('build', 'index.html')
    return render_template('index.html')

@app.route('/cmd')
def cmd():
    req = requests.get(target_website + "cmd")
    res = {'data': str(req.content)}
    return res
    

@app.route('/cmd/IDN')
def cmd_idn():
    req = requests.get(target_website + "cmd/IDN")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/LIM')
def limit():
    req = requests.get(target_website + "cmd/LIM")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/LIM/[min max]')
def min_max_limit():
    req = requests.get(target_website + "cmd/LIM")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/ECHO/<string:name>')
def echo(name):
    req = requests.get(target_website + "cmd/ECHO/" + name)
    res = {'data': str(req.content) }
    return res

@app.route('/cmd/PING')
def ping():
    req = requests.get(target_website + "cmd/PING")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/START')
def start():
    req = requests.get(target_website + "cmd/START")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/STOP')
def stop():
    req = requests.get(target_website + "cmd/STOP")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/SINGLE')
def single():
    req = requests.get(target_website + "cmd/SINGLE")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/STATE')
def state():
    req = requests.get(target_website + "cmd/STATE")
    res = {'data': str(req.content)}
    return res

@app.route('/cmd/TRACE')
def trace():
    req = requests.get(target_website + "cmd/TRACE")
    res = {'data': str(req.content)}
    return res
