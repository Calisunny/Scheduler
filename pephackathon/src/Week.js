import React, { Component } from 'react';
import Axios from "axios";
import "./App.css";

class Week extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekDays: ["SUN","MON","TUE","WED","THURS","FRI","SAT"],
            data: [],
            startDay: -1,
        }
    }
    async getData() {
        const name = this.props.str;
        const weekStart= this.state.startDay + (this.props.val - 1) * 7;
        let dbdata = [];
        function weekInfo(str,day) {
            let daydata= [];
            return new Promise(async (resolve) => {
                let date= "2021-06-" + (day.length === 1 ? "0" + day : day);
                await Axios.get("http://localhost:3001/week", {
                    params: { name : str, date : date},
                }).then(async (response) => {
                     let currday= response.data;
                    for (let i = 0; i < currday.length; i++) {
                        daydata.push(currday[i].starttime.substring(0, 5));
                        daydata.push(currday[i].endtime.substring(0, 5));
                        daydata.push(currday[i].task);
                    }
                    resolve(daydata);
                });
            });
        }
        for(let i=weekStart; i<weekStart+7; i++){
            let daydata= await weekInfo(name,i+"");
            dbdata.push(daydata);
        }
        this.setState({data : dbdata});
    }
    render() {
        return (
            <div>
                Week
            </div>
        )
    }
}

export default Week
