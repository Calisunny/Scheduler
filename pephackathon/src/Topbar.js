import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import "./App.css";
import React, { Component } from 'react'

class Topbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view : "Day",
            ops: 0,
        }
    }
    changeView= (e) =>{
        this.setState({view : e.target.value});
    }
    changeOps= (e) =>{
        this.setState({ops : e.target.value});
    }
    render() {
        const curr= this.state;
        let view= <Day str={curr.str}/>;
        let options= [30];
        if(curr.view === "Week"){
            view= <Week/>;
            options= [5];
        }else if(curr.view === "Month"){
            view= <Month/>;
            options= [];
        }
        return this.props.enter ?
        (
        <React.Fragment>
            <div className="header2">
                <button className="back" onClick={this.props.back} > BACK </button>
                <select className="viewType" onChange={(e)=>{this.changeOps(e)}}>
                {
                    options.map=((num)=>{
                        {
                            for(let i=1; i<=options[1]; i++){
                                <option type="1" > 1 </option>
                            }
                        }
                    })
                }
                </select>
                <select className="viewType" onChange={this.props.changeView}>
                    <option type="1" > Day </option>
                    <option type="2" > Week </option>
                    <option type="3" > Month </option>
                </select>
            </div>
            {view}
        </React.Fragment>
        )
        :
        (
        <div className="header">
            <div className="headerFont">
                <div className="oneLine">
                    <input
                        placeholder="🔎 Search Teacher"
                        className="input"
                        type="text"
                        onChange={(e)=>this.props.textChange(e)}
                    />
                </div>
            </div>
        </div>
        );
    }
}

export default Topbar
