"use client";

import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  BollingerSeries,
  CandlestickSeries,
  LineSeries,
  RSISeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  BollingerBandTooltip,
  MovingAverageTooltip,
  OHLCTooltip,
  RSITooltip,
  SingleValueTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import {
  atr,
  bollingerBand,
  ema,
  rsi,
  sma,
} from "react-stockcharts/lib/indicator";
import ChartHeader from "./ChartHeader";
const defaltEmaConfig = {
  windowSize: 20,
  strock: "blue",
};
const defaltSmaConfig = {
  windowSize: 20,
  strock: "red",
};
const bbStroke = {
  top: "#964B00",
  middle: "#000000",
  bottom: "#964B00",
};

const bbFill = "#4682B4";

class CandleStickChartWithCHMousePointer extends React.Component {
  render() {
    const {
      type,
      data: initialData,
      width,
      ratio,
      height,
      emaConfig = defaltEmaConfig,
      smaConfig = defaltSmaConfig,
      enableIndicators,
    } = this.props;
    const emaIndicator = ema()
      .options({
        windowSize: emaConfig.windowSize, // optional will default to 10
        sourcePath: "close", // optional will default to close as the source
      })
      .skipUndefined(true) // defaults to true
      .merge((d, c) => {
        d.ema20 = c;
      }) // Required, if not provided, log a error
      .accessor((d) => d.ema20) // Required, if not provided, log an error during calculation
      .stroke(emaConfig.strock); // Optional
    const smaIndicator = sma()
      .options({ windowSize: smaConfig.windowSize })
      .merge((d, c) => {
        d.sma = c;
      })
      .accessor((d) => d.sma)
      .stroke(smaConfig.strock);
    const bb = bollingerBand()
      .merge((d, c) => {
        d.bb = c;
      })
      .accessor((d) => d.bb);

    const rsiCalculator = rsi()
      .options({ windowSize: 14 })
      .merge((d, c) => {
        d.rsi = c;
      })
      .accessor((d) => d.rsi);

    const atr14 = atr()
      .options({ windowSize: 14 })
      .merge((d, c) => {
        d.atr14 = c;
      })
      .accessor((d) => d.atr14);

    const calculatedData = emaIndicator(
      smaIndicator(bb(rsiCalculator(atr14(initialData))))
    );

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(calculatedData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    return (
      <div
        style={{
          border: "1px solid lightGreen",
        }}
      >
        <ChartCanvas
          mouseMoveEvent={true}
          panEvent={true}
          zoomEvent={true}
          clamp={true}
          height={height - 30}
          ratio={ratio}
          width={width - 20}
          // margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
          type={type}
          seriesName="MSFT"
          data={data}
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents}
        >
          <Chart
            height={height / 2}
            id={1}
            yExtents={[
              (d) => [d.high, d.low],
              emaIndicator.accessor(),
              smaIndicator.accessor(),
              bb.accessor(),
            ]}
            origin={(w, h) => [0, 0]}
          >
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="right" orient="right" ticks={10} />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
            />
            {enableIndicators.candelstick && (
              <CandlestickSeries
                fill={(d) => (d.close > d.open ? "#ff0000" : "#158d01")}
                stroke={(d) => (d.close > d.open ? "#ff0000" : "#158d01")}
                wickStroke={(d) => (d.close > d.open ? "#ff0000" : "#158d01")}
                opacity={1}
              />
            )}
            {enableIndicators.bb && (
              <>
                <BollingerSeries
                  yAccessor={(d) => d.bb}
                  stroke={bbStroke}
                  fill={bbFill}
                />
                <BollingerBandTooltip
                  origin={[-38, 60]}
                  yAccessor={(d) => d.bb}
                  options={bb.options()}
                />
              </>
            )}
            {console.log({ enableIndicators })}
            {/* Ema */}
            {enableIndicators.ema && (
              <>
                <LineSeries
                  yAccessor={emaIndicator.accessor()}
                  stroke={emaIndicator.stroke()}
                />
                <CurrentCoordinate
                  yAccessor={emaIndicator.accessor()}
                  fill={emaIndicator.stroke()}
                />
              </>
            )}

            {/* Sma */}
            {enableIndicators.sma && (
              <>
                <LineSeries
                  yAccessor={smaIndicator.accessor()}
                  stroke={smaIndicator.stroke()}
                />
                <CurrentCoordinate
                  yAccessor={smaIndicator.accessor()}
                  fill={smaIndicator.stroke()}
                />
              </>
            )}

            {/* Moveing Avarage */}
            {enableIndicators.movingaveragetooltip && (
              <MovingAverageTooltip
                onClick={(e) => console.log(e)}
                origin={[-38, 15]}
                options={[
                  {
                    yAccessor: smaIndicator.accessor(),
                    type: smaIndicator.type(),
                    stroke: smaIndicator.stroke(),
                    windowSize: smaIndicator.options().windowSize,
                  },
                  {
                    yAccessor: emaIndicator.accessor(),
                    type: emaIndicator.type(),
                    stroke: emaIndicator.stroke(),
                    windowSize: emaIndicator.options().windowSize,
                  },
                ]}
              />
            )}

            <OHLCTooltip forChart={1} origin={[-40, 0]} />
          </Chart>

          {/* Bar seares */}
          {enableIndicators.barseries && (
            <Chart
              id={2}
              height={height / 2}
              yExtents={(d) => d.volume}
              origin={(w, h) => [0, 0]}
            >
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                tickFormat={format(".2s")}
              />

              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%Y-%m-%d")}
              />
              <MouseCoordinateY
                at="left"
                orient="left"
                displayFormat={format(".4s")}
              />

              <BarSeries
                yAccessor={(d) => d.volume}
                fill={(d) => (d.close > d.open ? "#ff0000" : "#158d01")}
                stroke={(d) => (d.close > d.open ? "#ff0000" : "#158d01")}
                // wickStroke={(d) => (d.close > d.open ? "#ff0000" : "#158d01")}
                // opacity={1}
              />
            </Chart>
          )}

          {/* Rsi */}
          {enableIndicators.rsi && (
            <Chart
              id={3}
              yExtents={[0, 100]}
              height={height / 6}
              origin={(w, h) => [0, height / 2]}
            >
              <XAxis
                axisAt="bottom"
                orient="bottom"
                showTicks={false}
                outerTickSize={0}
              />
              <YAxis axisAt="right" orient="right" tickValues={[30, 50, 70]} />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />

              <RSISeries yAccessor={(d) => d.rsi} />

              <RSITooltip
                origin={[-38, 15]}
                yAccessor={(d) => d.rsi}
                options={rsiCalculator.options()}
              />
            </Chart>
          )}

          {/* Atr */}
          {enableIndicators.atr && (
            <Chart
              id={8}
              yExtents={atr14.accessor()}
              height={125}
              origin={(w, h) => [0, h - 125]}
              padding={{ top: 10, bottom: 10 }}
            >
              <XAxis axisAt="bottom" orient="bottom" />
              <YAxis axisAt="right" orient="right" ticks={2} />

              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%Y-%m-%d")}
              />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />

              <LineSeries
                yAccessor={atr14.accessor()}
                stroke={atr14.stroke()}
              />
              <SingleValueTooltip
                yAccessor={atr14.accessor()}
                yLabel={`ATR (${atr14.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                /* valueStroke={atr14.stroke()} - optional prop */
                /* labelStroke="#4682B4" - optional prop */
                origin={[-40, 15]}
              />
            </Chart>
          )}

          <CrossHairCursor />
        </ChartCanvas>
      </div>
    );
  }
}

CandleStickChartWithCHMousePointer.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithCHMousePointer.defaultProps = {
  type: "svg",
};
CandleStickChartWithCHMousePointer = fitWidth(
  CandleStickChartWithCHMousePointer
);

export default CandleStickChartWithCHMousePointer;
