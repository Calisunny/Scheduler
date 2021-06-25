import React, { Component } from 'react';
import Axios from "axios";
import "./App.css";

class Day extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: [],
            str: "",
            date: "21"
        }
    }
    static getDerivedStateFromProps(props,state){
        return ({str : props.str});
    }
    async getData() {
        const name = this.state.str;
        let date= this.state.date;
        date= "2021-06-"+ (date.length === 1 ? "0" + date : date);
        console.log(date);
        let dbdata = [];
        function getName(str) {
            return new Promise(async (resolve) => {
                await Axios.get("http://localhost:3001/day", {
                    params: { name : str, date : date},
                }).then(async (response) => {
                    let data= response.data;
                    for (let i = 0; i < data.length; i++) {
                        dbdata.push(data[i]);
                    }
                    resolve(dbdata);
                });
            });
        }
        let data = await getName(name);
        this.setState({show : data});
    }
    render() {
        const show= this.state.show;
        const arr= [1];
        return (
            <div>
                {
                    arr.map(()=>{
                        for(let i=0;i<show.length;i=i+3){
                          return(
                          <div className="oneLine" key={i}>
                            {
                                show[i]             //start
                            } - {
                                show[i+1]           //end
                            } <br/> {
                                show[i+2]           //task
                            }
                          </div>
                          )
                        }
                        return <React.Fragment/>
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        this.getData();
    }
}

export default Day
