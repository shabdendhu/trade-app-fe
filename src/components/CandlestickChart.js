// import React, { Component } from "react";

// class CandlestickChart extends Component {
//   constructor(props) {
//     super(props);
//     this.canvasRef = React.createRef();
//     this.state = {
//       scale: 1, // Initial scale
//     };
//     this.lastScale = 1; // To store the previous scale value
//   }

//   componentDidMount() {
//     this.drawCandlestickChart();
//     this.addEventListeners();
//   }

//   addEventListeners() {
//     const canvas = this.canvasRef.current;
//     canvas.addEventListener("wheel", this.handleWheel);
//     canvas.addEventListener("touchstart", this.handleTouchStart);
//     canvas.addEventListener("touchmove", this.handleTouchMove);
//     window.addEventListener("scroll", this.handleScroll);
//   }

//   componentWillUnmount() {
//     const canvas = this.canvasRef.current;
//     canvas.removeEventListener("wheel", this.handleWheel);
//     canvas.removeEventListener("touchstart", this.handleTouchStart);
//     canvas.removeEventListener("touchmove", this.handleTouchMove);
//     window.removeEventListener("scroll", this.handleScroll);
//   }
//   handleScroll = (e) => {
//     // Calculate the new scale based on the mouse wheel direction
//     const delta = e.deltaY > 0 ? 0.9 : 1.1;
//     const newScale = this.state.scale * delta;

//     // Ensure the scale is within a certain range
//     // if (newScale >= 1 && newScale <= 2) {
//     this.setState({ scale: newScale });
//     // When scrolling, clear and redraw the entire chart
//     this.drawCandlestickChart();
//   };
//   handleWheel = (e) => {
//     e.preventDefault();

//     // Calculate the new scale based on the mouse wheel direction
//     const delta = e.deltaY > 0 ? 0.9 : 1.1;
//     const newScale = this.state.scale * delta;
//     console.log({ newScale });

//     // Ensure the scale is within a certain range
//     // if (newScale >= 1 && newScale <= 2) {
//     this.setState({ scale: newScale });
//     this.drawCandlestickChart(newScale);
//     // }
//   };

//   handleTouchStart = (e) => {
//     // Store the initial touch positions for zoom calculation
//     if (e.touches.length === 2) {
//       this.touchStartDistance = Math.hypot(
//         e.touches[0].clientX - e.touches[1].clientX,
//         e.touches[0].clientY - e.touches[1].clientY
//       );
//     }
//   };

//   handleTouchMove = (e) => {
//     // Calculate the zoom factor based on touch gestures
//     if (e.touches.length === 2) {
//       const touchDistance = Math.hypot(
//         e.touches[0].clientX - e.touches[1].clientX,
//         e.touches[0].clientY - e.touches[1].clientY
//       );

//       const newScale =
//         (this.state.scale * touchDistance) / this.touchStartDistance;

//       // Ensure the scale is within a certain range
//       if (newScale >= 1 && newScale <= 2) {
//         this.setState({ scale: newScale });
//         this.drawCandlestickChart(newScale);
//       }
//     }
//   };

//   // drawCandlestickChart(scale) {
//   //   const canvas = this.canvasRef.current;
//   //   const ctx = canvas.getContext("2d");
//   //   const ohlcData =
//   //     this.props.data.feeds["NSE_INDEX|Nifty Bank"].ff.indexFF.marketOHLC.ohlc;

//   //   // Define chart dimensions and padding
//   //   const chartWidth = canvas.width - 40;
//   //   const chartHeight = canvas.height - 40;
//   //   const padding = 20;

//   //   // Find the min and max values for scaling
//   //   const minPrice = Math.min(...ohlcData.map((item) => item.low));
//   //   const maxPrice = Math.max(...ohlcData.map((item) => item.high));

//   //   const priceRange = maxPrice - minPrice;

//   //   // Calculate the candle width based on the number of data points
//   //   const candleWidth = chartWidth / ohlcData.length;

//   //   // Clear the canvas
//   //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   //   ctx.fillStyle = "white";
//   //   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   //   // Draw grid lines
//   //   ctx.strokeStyle = "#ccc"; // Grid line color
//   //   ctx.lineWidth = 0.5;

//   //   // Horizontal grid lines
//   //   for (let i = 1; i < 5; i++) {
//   //     const y = (chartHeight / 5) * i + padding;
//   //     ctx.beginPath();
//   //     ctx.moveTo(padding, y);
//   //     ctx.lineTo(chartWidth + padding, y);
//   //     ctx.stroke();
//   //   }

//   //   // Vertical grid lines
//   //   for (let i = 1; i < ohlcData.length; i++) {
//   //     const x = i * candleWidth + padding;
//   //     ctx.beginPath();
//   //     ctx.moveTo(x, padding);
//   //     ctx.lineTo(x, chartHeight + padding);
//   //     ctx.stroke();
//   //   }

//   //   // Draw candlesticks
//   //   ohlcData.forEach((item, index) => {
//   //     const x = index * candleWidth + padding;
//   //     const yHigh =
//   //       chartHeight -
//   //       ((item.high - minPrice) / priceRange) * chartHeight +
//   //       padding;
//   //     const yLow =
//   //       chartHeight -
//   //       ((item.low - minPrice) / priceRange) * chartHeight +
//   //       padding;
//   //     const yOpen =
//   //       chartHeight -
//   //       ((item.open - minPrice) / priceRange) * chartHeight +
//   //       padding;
//   //     const yClose =
//   //       chartHeight -
//   //       ((item.close - minPrice) / priceRange) * chartHeight +
//   //       padding;
//   //     const scaledCandleWidth = candleWidth * scale;

//   //     // Draw candlestick body
//   //     ctx.fillStyle = item.open > item.close ? "red" : "green";
//   //     ctx.fillRect(
//   //       x - scaledCandleWidth / 2,
//   //       yOpen,
//   //       scaledCandleWidth,
//   //       yClose - yOpen
//   //     );

//   //     // Draw candlestick wicks (shadows)
//   //     ctx.strokeStyle = "transparent";
//   //     ctx.beginPath();
//   //     ctx.moveTo(x, yHigh);
//   //     ctx.lineTo(x, yOpen);
//   //     ctx.moveTo(x, yClose);
//   //     ctx.lineTo(x, yLow);
//   //     ctx.stroke();
//   //     ctx.setTransform(scale, 0, 0, scale, 0, 0);
//   //   });
//   // }
//   drawCandlestickChart(scale) {
//     const canvas = this.canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const ohlcData =
//       this.props.data.feeds["NSE_INDEX|Nifty Bank"].ff.indexFF.marketOHLC.ohlc;

//     // Define chart dimensions and padding
//     const chartWidth = canvas.width - 40;
//     const chartHeight = canvas.height - 40;
//     const padding = 20;

//     // Find the min and max values for scaling
//     const minPrice = Math.min(...ohlcData.map((item) => item.low));
//     const maxPrice = Math.max(...ohlcData.map((item) => item.high));

//     const priceRange = maxPrice - minPrice;

//     // Calculate the candle width based on the number of data points
//     const candleWidth = chartWidth / ohlcData.length;

//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Apply the scale transformation only once before drawing the chart
//     ctx.setTransform(scale, 0, 0, scale, 0, 0);

//     // Draw grid lines
//     ctx.strokeStyle = "#ccc"; // Grid line color
//     ctx.lineWidth = 0.5;

//     // Horizontal grid lines
//     for (let i = 1; i < 5; i++) {
//       const y = (chartHeight / 5) * i + padding;
//       ctx.beginPath();
//       ctx.moveTo(padding, y);
//       ctx.lineTo(chartWidth + padding, y);
//       ctx.stroke();
//     }

//     // Vertical grid lines
//     for (let i = 1; i < ohlcData.length; i++) {
//       const x = i * candleWidth + padding;
//       ctx.beginPath();
//       ctx.moveTo(x, padding);
//       ctx.lineTo(x, chartHeight + padding);
//       ctx.stroke();
//     }

//     // Draw candlesticks
//     ohlcData.forEach((item, index) => {
//       const x = index * candleWidth + padding;
//       const yHigh =
//         chartHeight -
//         ((item.high - minPrice) / priceRange) * chartHeight +
//         padding;
//       const yLow =
//         chartHeight -
//         ((item.low - minPrice) / priceRange) * chartHeight +
//         padding;
//       const yOpen =
//         chartHeight -
//         ((item.open - minPrice) / priceRange) * chartHeight +
//         padding;
//       const yClose =
//         chartHeight -
//         ((item.close - minPrice) / priceRange) * chartHeight +
//         padding;
//       const scaledCandleWidth = candleWidth * scale;

//       // Draw candlestick body
//       ctx.fillStyle = item.open > item.close ? "red" : "green";
//       ctx.fillRect(
//         x - scaledCandleWidth / 2,
//         yOpen,
//         scaledCandleWidth,
//         yClose - yOpen
//       );

//       // Draw candlestick wicks (shadows)
//       ctx.strokeStyle = "transparent";
//       ctx.beginPath();
//       ctx.moveTo(x, yHigh);
//       ctx.lineTo(x, yOpen);
//       ctx.moveTo(x, yClose);
//       ctx.lineTo(x, yLow);
//       ctx.stroke();
//     });
//   }

//   render() {
//     return (
//       <canvas
//         ref={this.canvasRef}
//         width={2000} // Set the canvas width
//         height={1000} // Set the canvas height
//         style={{ border: "1px solid white" }}
//       />
//     );
//   }
// }

// export default CandlestickChart;
import React, { Component } from "react";

class CandlestickChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      scale: 1, // Initial scale
    };
    this.lastScale = 1; // To store the previous scale value
  }

  componentDidMount() {
    this.drawCandlestickChart();
    this.addEventListeners();
  }

  addEventListeners() {
    const canvas = this.canvasRef.current;
    canvas.addEventListener("wheel", this.handleWheel);
    canvas.addEventListener("touchstart", this.handleTouchStart);
    canvas.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    const canvas = this.canvasRef.current;
    canvas.removeEventListener("wheel", this.handleWheel);
    canvas.removeEventListener("touchstart", this.handleTouchStart);
    canvas.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = (e) => {
    e.preventDefault();

    // Calculate the new scale based on the mouse wheel direction
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = this.state.scale * delta;

    // Ensure the scale is within a certain range
    // You can adjust the range as needed
    if (newScale >= 0.5 && newScale <= 2) {
      this.setState({ scale: newScale });
      this.drawCandlestickChart(newScale);
    }
  };

  handleWheel = (e) => {
    e.preventDefault();

    // Calculate the new scale based on the mouse wheel direction
    const delta = e.deltaY > 0 ? 0.9 : 1.1;

    // Ensure the scale is within a certain range
    // You can adjust the range as needed
    const newScale = this.state.scale * delta;

    // if (newScale >= 0.5 && newScale <= 2) {
    this.setState({ scale: newScale });
    this.drawCandlestickChart(newScale);
    // }
  };

  handleTouchStart = (e) => {
    // Store the initial touch positions for zoom calculation
    if (e.touches.length === 2) {
      this.touchStartDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };

  handleTouchMove = (e) => {
    // Calculate the zoom factor based on touch gestures
    if (e.touches.length === 2) {
      const touchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );

      const newScale =
        (this.state.scale * touchDistance) / this.touchStartDistance;

      // Ensure the scale is within a certain range
      // You can adjust the range as needed
      if (newScale >= 0.5 && newScale <= 2) {
        this.setState({ scale: newScale });
        this.drawCandlestickChart(newScale);
      }
    }
  };

  drawCandlestickChart(scale) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ohlcData =
      this.props.data.feeds["NSE_INDEX|Nifty Bank"].ff.indexFF.marketOHLC.ohlc;

    // Define chart dimensions and padding
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    const padding = 20;

    // Find the min and max values for scaling on the x-axis only
    const minPrice = Math.min(...ohlcData.map((item) => item.low));
    const maxPrice = Math.max(...ohlcData.map((item) => item.high));
    const priceRange = maxPrice - minPrice;

    // Calculate the candle width based on the number of data points
    const candleWidth = (chartWidth / ohlcData.length) * scale;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply the scale transformation for the x-axis only
    ctx.setTransform(scale, 0, 0, 1, 0, 0);

    // Draw grid lines on the x-axis with the inverse of the x-axis scale
    ctx.strokeStyle = "#ccc"; // Grid line color
    ctx.lineWidth = 0.5;

    // Horizontal grid lines
    for (let i = 1; i < 5; i++) {
      const y = (chartHeight / 5) * i + padding;
      ctx.beginPath();
      ctx.moveTo(padding / scale, y);
      ctx.lineTo((chartWidth + padding) / scale, y);
      ctx.stroke();
    }

    // Draw candlesticks (scaled as before)
    ohlcData.forEach((item, index) => {
      const x = index * candleWidth + padding;
      const yHigh =
        chartHeight -
        ((item.high - minPrice) / priceRange) * chartHeight +
        padding;
      const yLow =
        chartHeight -
        ((item.low - minPrice) / priceRange) * chartHeight +
        padding;
      const yOpen =
        chartHeight -
        ((item.open - minPrice) / priceRange) * chartHeight +
        padding;
      const yClose =
        chartHeight -
        ((item.close - minPrice) / priceRange) * chartHeight +
        padding;
      const scaledCandleWidth = candleWidth;

      // Draw candlestick body
      ctx.fillStyle = item.open > item.close ? "red" : "green";
      ctx.fillRect(
        (x - scaledCandleWidth / 2) / scale,
        yOpen,
        scaledCandleWidth,
        yClose - yOpen
      );

      // Draw candlestick wicks (shadows)
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.moveTo(x / scale, yHigh);
      ctx.lineTo(x / scale, yOpen);
      ctx.moveTo(x / scale, yClose);
      ctx.lineTo(x / scale, yLow);
      ctx.stroke();
    });
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={1000} // Set the canvas width
        height={500} // Set the canvas height
        style={{ border: "1px solid white" }}
      />
    );
  }
}

export default CandlestickChart;
