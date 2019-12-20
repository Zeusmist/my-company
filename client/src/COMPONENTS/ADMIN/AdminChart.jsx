import React, { Component } from "react";
import { Pie, Bar } from "react-chartjs-2";

class AdminChart extends Component{
    constructor(){
        super();
        this.state = {
            pieData: {}
        }
    }

    render(){
        const { type } = this.props;

        const barChart = 
            <div>
                <Bar
                    data={this.props.data}
                    width={100}
                    height={250}
                    options={{
                        title: {
                            display: true,
                            text: "Positions",
                            fontSize: 20
                        },
                        legend: {display: false},
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>

        const pieChart = 
            <div>
                <Pie
                    data={this.props.data}
                    width={100}
                    height={300}
                    options={{
                        title: {
                            display: true,
                            text: "Tasks",
                            fontSize: 20
                        },
                        legend: {display: true, position: "bottom"},
                        maintainAspectRatio: false
                    }}
                />
            </div>
            
        return(
            type === "bar" ? 
                barChart :
                pieChart
        )
    }
}

export default AdminChart;