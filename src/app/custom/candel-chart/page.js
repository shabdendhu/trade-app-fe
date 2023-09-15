"use client";

import React from "react";
import { render } from "react-dom";
// import Chart from "./Chart";
// import { getData } from "./utils";

import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData } from "@/utils/getData";
import CandleStickChartWithCHMousePointer from "@/components/Chart";

class ChartComponent extends React.Component {
  componentDidMount() {
    getData().then((data) => {
      this.setState({ data });
    });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
        <TypeChooser>
          {(type) => (
            <CandleStickChartWithCHMousePointer
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>
      </div>
    );
  }
}

export default ChartComponent;
