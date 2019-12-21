import Chart from './Chart'
import IndicatorRender from '../render/IndicatorRender'
import YAxisRender from '../render/YAxisRender'

import { IndicatorType } from '../internal/constants'

class IndicatorChart extends Chart {
  constructor (dom, config, dataProvider, defaultIndicatorType = IndicatorType.MACD) {
    super(dom, config)
    this.indicatorType = defaultIndicatorType
    this.yAxisRender = new YAxisRender(this.viewPortHandler, dataProvider)
    this.chartRender = new IndicatorRender(this.viewPortHandler, dataProvider, this.yAxisRender)
  }

  draw () {
    if (this.isDrawChart()) {
      const isMainChart = this.isMainChart()
      if (!isMainChart) {
        this.chartRender.renderHorizontalSeparatorLine(this.ctx, this.config.xAxis)
      }
      const yAxis = this.config.yAxis
      const isRealTimeChart = this.isRealTimeChart()
      this.yAxisRender.calcAxisMinMax(this.indicatorType, isMainChart, isRealTimeChart)
      this.yAxisRender.computeAxis()
      this.yAxisRender.renderSeparatorLines(this.ctx, yAxis)
      this.drawChart()
      this.yAxisRender.renderStrokeLine(this.ctx, yAxis, this.config.grid)
      this.yAxisRender.renderAxisLine(this.ctx, yAxis)
      this.yAxisRender.renderTickLines(this.ctx, yAxis)
      this.yAxisRender.renderAxisLabels(this.ctx, yAxis)
    }
  }

  drawChart () {
    this.chartRender.renderIndicator(this.ctx, this.indicatorType, this.config.indicator, false)
  }

  isDrawChart () {
    return this.indicatorType !== IndicatorType.NO
  }

  isMainChart () {
    return false
  }

  isRealTimeChart () {
    return false
  }
}

export default IndicatorChart
