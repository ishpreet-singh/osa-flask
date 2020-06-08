import React, { Component } from 'react';
import CanvasJSReact from './lib/canvasjs.react';
import Button from 'react-bootstrap/Button';
import OscillatorImg from './oscillator-img.png';
import './App.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var updateInterval = 1000;
var dataPoints = [];
var screenPoints = 80;
var sliceCount = 0;
var updateIntervalNum;

class App extends Component {

    constructor() {
        super();
        this.state = {
            active: true,
            start: 0,
            stop: 0,
            xArr: [],
            yArr: []
        }
        this.toggleState = this.toggleState.bind(this);
        this.updateDataPoints = this.updateDataPoints.bind(this);
        this.clearChart = this.clearChart.bind(this);
        this.reset = this.reset.bind(this);
        this.onStartClick = this.onStartClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
        this.onSingleClick = this.onSingleClick.bind(this);
        this.getTrace = this.getTrace.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    componentDidMount() {
        // const doc = document.getElementById("chartContainer");
        // console.log(doc.height);
        // updateIntervalNum = setInterval(this.updateDataPoints, updateInterval);
    }

    clearChart() {
        let arr = [];
        this.chart.options.data[0].dataPoints = arr;
        this.chart.render();
    }

    updateDataPoints() {
        if(!this.state.active)  return;
        console.log("I am called");
        fetch('/cmd/TRACE').then(res => res.json()).then((d) => {
            try {
                if(!this.state.active)  return;
                let text = d.data;
                // text = text.slice(2);
                text = text.slice(2, text.length - 1);
                let data = JSON.parse(text);
                let num = Math.random() * (100 - 50) + 50;
                this.state.xArr = data.xdata.slice(num);
                this.state.yArr = data.ydata.slice(num);
                // this.state.xArr = data.xdata.slice();
                // this.state.yArr = data.ydata.slice();
                this.state.active = true;
                this.renderChart();
            } catch {
                this.reset();
            }
        }, () => {
            this.reset();
        });
    }

    toggleState() {
        this.state.active = !this.state.active
    }

    reset() {
        this.state.active = false;
        this.clearChart();
        clearInterval(updateIntervalNum);
    }

    renderChart() {
        let arr = [];
        let len = this.state.xArr.length;
        for (let i = 0; i < len; i++) {
            let obj = {
                x: this.state.xArr[i],
                y: this.state.yArr[i]
            };
            arr.push(obj);
        }
        this.chart.options.data[0].dataPoints = arr;
        this.chart.render();
    }

    onStartClick() {
        this.state.active = true;
        updateIntervalNum = setInterval(this.updateDataPoints, updateInterval);
        this.updateDataPoints();
    }

    onStopClick() {
        this.reset();
        // fetch('/cmd/STOP').then(res => res.json()).then((d) => {
        //     console.log("Stop Clicked");
        //     this.reset();
        // });
    }

    getTrace() {
        fetch('/cmd/TRACE').then(res => res.json()).then((d) => console.log(d))
    }

    onSingleClick() {
        try {
            let num = 20;
            this.state.xArr = this.state.xArr.slice(num);
            this.state.yArr = this.state.yArr.slice(num);
            this.state.active = true;
            clearInterval(updateIntervalNum);
            this.renderChart();
        } catch {
            this.reset();
        }
        fetch('/cmd/SINGLE').then(res => res.json()).then((d) => console.log(d))
    }

    render() {

        const doc = document.getElementById("chartContainer");

        let options = {
            backgroundColor: "black",
            zoomEnabled: true,
            height: 400,
            width: 520,
            animationEnabled: false,
            axisX: {
                labelFontColor: "green"
            },
            axisY: {
                includeZero: false,
                gridThickness: 0,
                labelFontColor: "green"
            },
            data: [{
                type: "line",
                color: "green",
                dataPoints: []
            }]
        }

        return (

            <div className="Oscillator">

                <div className="container">
                    <h1 className="my_text_center">Cloud Optical Spectrum Analyzer</h1>
                    <div className="base">
                        <img src={OscillatorImg} className="img-fluid"></img>
                        <div className="overlapping_div" id="chartContainer">
                            <CanvasJSChart options={options} className="overlapping_div"
                                onRef={ref => this.chart = ref}
                            />
                        </div>
                        <a href="#" className="my_btn" onClick={this.onStartClick}>
                            <i className="fa fa-play-circle my_btn_start" title="Start"></i>
                        </a>
                        <a href="#" className="my_btn" onClick={this.onStopClick}>
                            <i className="fa fa-stop-circle my_btn_stop" title="Stop"></i>
                        </a>
                        <a href="#" className="my_btn" onClick={this.onSingleClick}>
                            <i className="fa fa-pause-circle my_btn_single" title="Single"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;