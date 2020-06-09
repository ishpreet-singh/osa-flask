# Cloud Optical Spectrum Analyzer

This is an attempt to demonstrate a virtual optical spectrum analyzer. Read more about [optical spectrum analyzer](https://www.exfo.com/en/resources/videos/product-demos/simple-intuitive-optical-spectrum-analysis/).

# Live
The live version of the project can be found at: https://flask-osa.herokuapp.com/


# Set up locally

To run the project locally, follow these steps:

1. Clone the Project:
   
```
git clone https://github.com/ishpreet-singh/osa-flask
```


2. Change your directory:
   
```
cd osa-flask
```


3. Make sure you have [npm](https://www.npmjs.com/get-npm) and [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed:

```
npm i yarn
```


4. Install the dependencies:

```
yarn install
```


5. Start the React Server:

```
yarn start
```


6. Move to Flask directory:

```
cd api
```


7. Create a virtual environment, Install the virtual environment if its not installed:

```
python3 -m venv venv
```


8. Install the requirements:

```
pip3 install -r requirements.txt
```


9.  Start the Flask Server:

```
yarn start-api
```

10. Head to `http://localhost:3000/` to see the result.


# APIS

|                     Command                     |                               Description                                   |
|:-----------------------------------------------:|:-------------------------------------------------------------------------------:|
|       https://flask-osa.herokuapp.com/cmd       |                              returns command prompt                             |
|       https://flask-osa.herokuapp.com/cmd       |                       returns device identification string                      |
|    https://flask-osa.herokuapp.com/cmd/START    |                            returns x-axis limits in m                           |
| https://flask-osa.herokuapp.com/cmd/ECHO/string | Emulates query command and sends a string to API, will get the same string back |
|     https://flask-osa.herokuapp.com/cmd/PING    |                                   Returns PONG                                  |
|    https://flask-osa.herokuapp.com/cmd/START    |                  sets instrument state to continues acquisition                 |
|     https://flask-osa.herokuapp.com/cmd/STOP    |                          sets instrument state to IDLE                          |
|    https://flask-osa.herokuapp.com/cmd/SINGLE   |     starts a single scan (blocking operation, single scan takes few seconds)    |
|    https://flask-osa.herokuapp.com/cmd/STATE    |                             returns instrument state                            |
|    https://flask-osa.herokuapp.com/cmd/TRACE    |                         returns OSA trace in json format                        |


# Features

* START button initiates continuous (repetitive) acquisition with ~1Hz refresh rate
* STOP button stops acquisition
* SINGLE button retrieves a single trace from the virtual OSA
* TRACE are displaced within specified scan limits
* Users can send queries and access apis via REST
* Graphs can be zoomed, panned, read data values off the plot.
* The app is deployed on Heroku.