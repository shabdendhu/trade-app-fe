"use client";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

export default function TradeView() {
  return (
    <div>
      <TradingViewWidget
        symbol="NASDAQ:AAPL"
        theme={Themes.DARK}
        locale="fr"
        autosize
      />
      <TradingViewWidget
        symbol="NASDAQ:AAPL"
        theme={Themes.DARK}
        locale="fr"
        autosize
      />
    </div>
  );
}
