import React, { Component } from 'react';
import CanvasJSReact from './lib/canvasjs.react';
import Button from 'react-bootstrap/Button';
import OscillatorImg from './oscillator-img.png';
import './App.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var updateInterval = 1000;
var updateIntervalNum;

class App extends Component {

    constructor() {
        super();
        this.state = {
            active: true,
            start: 0,
            stop: 0,
            xArr: [],
            yArr: [],
            height: 320,
            width: 420
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
        // updateIntervalNum = setInterval(this.updateDataPoints, updateInterval);
        window.onresize = this.render;
    }

    clearChart() {
        let arr = [];
        this.chart.options.data[0].dataPoints = arr;
        this.chart.render();
    }

    updateDataPoints() {
        if(!this.state.active)  return;
        fetch('/cmd/TRACE').then(res => res.json()).then((d) => {
            try {
                if(!this.state.active)  return;
                let text = d.data;
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
        // fetch('/cmd/TRACE').then(res => res.json()).then((d) => console.log(d))
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
        // fetch('/cmd/SINGLE').then(res => res.json()).then((d) => console.log(d))
    }

    render() {

        let options = {
            backgroundColor: "black",
            zoomEnabled: true,
            height: img.height() * 0.7,
            width: img.width() * 0.48,
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
                        <img src={OscillatorImg} className="img-fluid" id="osc-img"></img>
                        <div className="overlapping_div" id="chartContainer">
                            <CanvasJSChart id="canvas" options={options} className="canvas-child"
                                onRef={ref => this.chart = ref}
                            />
                        </div>
                        <a href="#" className="my_btn" onClick={this.onStartClick}>
                            <i className="fa fa-play-circle-o my_btn_start" title="Start"></i>
                        </a>
                        <a href="#" className="my_btn" onClick={this.onStopClick}>
                            <i className="fa fa-stop-circle-o my_btn_stop" title="Stop"></i>
                        </a>
                        <a href="#" className="my_btn" onClick={this.onSingleClick}>
                            <i className="fa fa-pause-circle-o my_btn_single" title="Single"></i>
                        </a>
                    </div>

                    <div className = "footer">
                        <p>
                            Made By  
                            <a href="https://github.com/ishpreet-singh"> Ishpreet Singh</a>. 
                            Checkout the       
                            <a href="https://github.com/ishpreet-singh/osa-flask"> full code</a>.
                        </p>
                    </div>

                </div>

            </div>
        );
    }

}

export default App;