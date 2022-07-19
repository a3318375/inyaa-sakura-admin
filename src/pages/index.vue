<script setup lang="ts">
import { use } from 'echarts/core'
import * as echarts from 'echarts/lib/echarts'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, PolarComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { CountTo } from 'vue3-count-to'
use([BarChart, TitleComponent, LegendComponent, CanvasRenderer, GridComponent, PieChart, LineChart, TooltipComponent, PolarComponent])
const { t } = useI18n()
const income = {
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [{
    data: [10, 50, 36, 85, 98, 72, 79, 88, 80],
    type: 'line',
    smooth: true,
    show: false,
    symbol: 'none',
    animationDuration: 1000,
    itemStyle: {
      color: '#ffffff',
    },
  }],
}
const expense = {
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [{
    data: [50, 42, 36, 78, 56, 72, 20, 15, 35],
    type: 'line',
    smooth: true,
    show: false,
    symbol: 'none',
    animationDuration: 1000,
    itemStyle: {
      color: '#ffffff',
    },
  }],
}
const total = {
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [{
    data: [30, 45, 64, 78, 79, 80, 75, 70, 90],
    type: 'line',
    smooth: true,
    show: false,
    symbol: 'none',
    animationDuration: 1000,
    itemStyle: {
      color: '#ffffff',
    },
  }],
}
const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
const charts2Option = {
  backgroundColor: '#fff',
  title: {
    text: '全国6月销售统计',
    fontSize: 12,
    fontWeight: 400,
    left: 'center',
    top: '5%',
  },
  legend: {
    icon: 'circle',
    top: '5%',
    right: '5%',
    itemWidth: 6,
    itemGap: 20,
    color: '#556677',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      label: {
        show: true,
        backgroundColor: '#fff',
        color: '#556677',
        borderColor: 'rgba(0,0,0,0)',
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetY: 0,
      },
      lineStyle: {
        width: 0,
      },
    },
    backgroundColor: '#fff',
    color: '#5c6c7c',
    padding: [10, 10],
    extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)',
  },
  grid: {
    top: '15%',
  },
  xAxis: [{
    type: 'category',
    data: ['北京', '上海', '广州', '深圳', '香港', '澳门', '台湾', '南宁', '海外'],
    axisLine: {
      lineStyle: {
        color: '#DCE2E8',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: 0,
      color: '#556677',
      // 默认x轴字体大小
      fontSize: 12,
      // margin:文字到x轴的距离
      margin: 15,
    },
    axisPointer: {
      label: {
        // padding: [11, 5, 7],
        padding: [0, 0, 10, 0],
        /*
除了padding[0]建议必须是0之外，其他三项可随意设置

和CSSpadding相同，[上，右，下，左]

如果需要下边线超出文字，设左右padding即可，注：左右padding最好相同

padding[2]的10:

10 = 文字距下边线的距离 + 下边线的宽度

如：UI图中文字距下边线距离为7 下边线宽度为2

则padding: [0, 0, 9, 0]

        */
        // 这里的margin和axisLabel的margin要一致!
        margin: 15,
        // 移入时的字体大小
        fontSize: 12,
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#fff', // 0% 处的颜色
          }, {
            // offset: 0.9,
            offset: 0.86,
            /*
0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）

            */
            color: '#fff', // 0% 处的颜色
          }, {
            offset: 0.86,
            color: '#33c0cd', // 0% 处的颜色
          }, {
            offset: 1,
            color: '#33c0cd', // 100% 处的颜色
          }],
          global: false, // 缺省为 false
        },
      },
    },
    boundaryGap: false,
  }],
  yAxis: [{
    type: 'value',
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#DCE2E8',
      },
    },
    axisLabel: {
      color: '#556677',
    },
    splitLine: {
      show: false,
    },
  }, {
    type: 'value',
    position: 'right',
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#556677',
      formatter: '{value}',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#DCE2E8',
      },
    },
    splitLine: {
      show: false,
    },
  }],
  series: [
    {
      name: 'Adidas',
      type: 'line',
      data: [10, 10, 30, 12, 15, 3, 7, 9, 8],
      symbolSize: 1,
      symbol: 'circle',
      smooth: true,
      yAxisIndex: 0,
      showSymbol: false,
      lineStyle: {
        width: 5,
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: '#9effff',
        },
        {
          offset: 1,
          color: '#9E87FF',
        },
        ]),
        shadowColor: 'rgba(158,135,255, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        color: colorList[0],
      },
    },
    {
      name: 'Nike',
      type: 'line',
      data: [5, 12, 11, 14, 25, 16, 10, 19, 25],
      symbolSize: 1,
      symbol: 'circle',
      smooth: true,
      yAxisIndex: 0,
      showSymbol: false,
      lineStyle: {
        width: 5,
        color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
          offset: 0,
          color: '#73DD39',
        },
        {
          offset: 1,
          color: '#73DDFF',
        },
        ]),
        shadowColor: 'rgba(115,221,255, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        color: colorList[1],
      },
    },
    {
      name: '老北京布鞋',
      type: 'line',
      data: [150, 120, 170, 140, 500, 160, 110, 95, 165],
      symbolSize: 1,
      yAxisIndex: 1,
      symbol: 'circle',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: '#fe9a',
        },
        {
          offset: 1,
          color: '#fe9a8b',
        },
        ]),
        shadowColor: 'rgba(254,154,139, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        color: colorList[2],
      },
    },
  ],
}
const colorLine = ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43']
const data = [{
  name: '北京',
  value: 25,
}, {
  name: '上海',
  value: 20,
}, {
  name: '广州',
  value: 18,
}, {
  name: '深圳',
  value: 15,
}, {
  name: '未知',
  value: 13,
}, {
  name: '海外',
  value: 9,
}].sort((a, b) => {
  return b.value - a.value
})
data.forEach((v, i) => {
  v.labelLine = {
    lineStyle: {
      width: 1,
      color: colorLine[i],
    },
  }
})
const chartPie = {
  series: [{
    type: 'pie',
    radius: '60%',
    center: ['50%', '50%'],
    clockwise: true,
    avoidLabelOverlap: true,
    label: {
      show: true,
      position: 'outside',
      formatter(params: { name: any; percent: string; dataIndex: any }) {
        const name = params.name
        const percent = `${params.percent}%`
        const index = params.dataIndex
        return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
      },
      rich: getRich(),
    },
    itemStyle: {
      color(params: { dataIndex: string | number }) {
        return colorList[params.dataIndex]
      },
    },
    data,
    roseType: 'radius',
  }],
}
function getRich() {
  const result = {}
  colorLine.forEach((v, i) => {
    result[`hr${i}`] = {
      backgroundColor: colorLine[i],
      borderRadius: 3,
      width: 3,
      height: 3,
      padding: [3, 3, 0, -12],
    }
    result[`a${i}`] = {
      padding: [8, -60, -20, -20],
      color: colorLine[i],
      fontSize: 12,
    }
  })
  return result
}
</script>

<template>
  <BaseContent>
    <div class="container q-pa-lg q-col-gutter-md">
      <div class="row justify-between q-col-gutter-md">
        <div class="col-xs-12 col-md-3 q-gutter-md">
          <q-card class="income">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  Income
                  <q-icon color="yellow" name="trending_up" />
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <CountTo :start-val="906584" :end-val="952765" :duration="1500" />
                  ¥
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;max-width: 150px">
                  <v-chart :option="income" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="expense ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  Expense
                  <q-icon color="green" name="trending_down" />
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo :start-val="400326" :end-val="439956" :duration="1500" />
                  ¥
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart :option="expense" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="total ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  Total
                  <q-icon color="yellow" name="trending_up" />
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo :start-val="706198" :end-val="756268" :duration="1500" />
                  ¥
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart class="" :option="total" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-md-9">
          <q-card class="cimo-shadow col-11" style="height: 100%;min-height:390px;padding: 3px;">
            <v-chart class="" :option="charts2Option" autoresize />
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-md-3">
          <q-card class="cimo-shadow" style="height: 430px; width: 100%; padding: 3px">
            <v-chart class="" :option="chartPie" autoresize />
          </q-card>
        </div>
        <div class="col-xs-12 col-md-3" />
        <div class="col-xs-12 col-md-6" />
      </div>
    </div>
  </BaseContent>
</template>

<route lang="yaml">
meta:
  layout: quasar
</route>

<style lang="css" scoped>
  .my-card {
    width: 100%;
    min-height: 390px;
    height: 100%;
    /*max-width: 350px;*/
  }

  .income {
    width: 100%;
    background: linear-gradient(to right, #68E4BC 0%, #4AD0D1 99%);
    border-radius: 5px;
    font-size: 14px;
    padding: 11px 15px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #ffffff;
    box-shadow: 0 12px 12px -11px #0db4afb8;
    background-size: 200% auto;
  }

  .income:hover {
    background-position: right center;
    box-shadow: 0 12px 20px -11px #0db4afb8;
  }

  .expense {
    width: 100%;
    background: linear-gradient(to left, #FCAC94 0%, #f3a183 98%);
    border-radius: 5px;
    font-size: 14px;
    padding: 11px 15px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #ffffff;
    box-shadow: 0 12px 12px -11px #FCA76C;
    background-size: 200% auto;
  }

  .expense:hover {
    background-position: right center;
    box-shadow: 0 12px 20px -11px #FCA76C;
  }

  .total {
    width: 100%;
    background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%);
    border-radius: 5px;
    font-size: 14px;
    padding: 11px 15px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #ffffff;
    box-shadow: 0 12px 12px -11px rgba(240, 115, 200, 0.73);
    background-size: 200% auto;
  }

  .total:hover {
    background-position: right center;
    box-shadow: 0 12px 20px -11px rgba(240, 115, 200, 0.73);
  }

  .btn-table {
    background: linear-gradient(to right, #36d1dc, #5b86e5);
    transition: all 0.3s ease-in-out;
  }

  .btn-table:hover {
    background-position: right center;
    box-shadow: 0 12px 20px -11px #5b86e5;
  }
</style>
