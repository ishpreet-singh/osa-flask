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
        // setInterval(this.onStartClick, updateInterval);
    }

    clearChart() {
        let arr = [];
        this.chart.options.data[0].dataPoints = arr;
        this.chart.render();
    }

    updateDataPoints() {
        return;
        if (!this.state.active) {
            this.clearChart();
            return;
        }
        let arr = [];
        let dps = this.chart.options.data[0].dataPoints.slice();
        if (dataPoints.length <= screenPoints) return;

        let shiftSize = Math.floor(screenPoints / 2);
        shiftSize = 40;
        arr = dps.slice(shiftSize);
        if (sliceCount == 0) {
            dataPoints = dataPoints.slice(shiftSize)
        }
        dataPoints = dataPoints.slice(shiftSize)
        arr = arr.concat(dataPoints.slice(0, shiftSize))
        sliceCount++;

        let options = this.chart.options;
        options.data[0].dataPoints = arr;
        this.chart.render();
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
        fetch('/cmd/TRACE').then(res => res.json()).then((d) => {
            try {
                let text = d.data;
                // text = text.slice(2);
                text = text.slice(2, text.length - 1);
                let data = JSON.parse(text);
                let num = Math.random() * (200 - 50) + 50;
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

    onStopClick() {
        fetch('/cmd/STOP').then(res => res.json()).then((d) => {
            console.log("Stop Clicked");
            this.reset();
        });
    }

    getTrace() {
        fetch('/cmd/TRACE').then(res => res.json()).then((d) => console.log(d))
    }

    onSingleClick() {
        fetch('/cmd/SINGLE').then(res => res.json()).then((d) => console.log(d))
    }

    render() {

        let options = {
            backgroundColor: "black",
            zoomEnabled: true,
            height: 225,
            width: 290,
            animationEnabled: false,
            axisY: {
                includeZero: false,
                gridThickness: 0,
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
                            <i className="fa fa-play-circle my_btn_start"></i>
                        </a>
                        <a href="#" className="my_btn" onClick={this.onStopClick}>
                            <i className="fa fa-stop-circle my_btn_stop"></i>
                        </a>
                        <a href="#" className="my_btn" onClick={this.onSingleClick}>
                            <i className="fa fa-pause-circle my_btn_single"></i>
                        </a>
                    </div>
                </div>
                {/* <Button variant="success" size="lg" onClick={() => !this.state.active && this.toggleState()} >Start</Button>{' '}
                <Button variant="danger" size="lg" onClick={() => this.state.active && this.toggleState()} >Stop</Button>{' '}
                <Button variant="danger" size="lg" onClick={() => this.state.active && this.reset()} >Reset</Button>{' '}
                <Button variant="warning" size="lg">Single</Button>{' '} */}
            </div>
        );
    }

}

export default App;