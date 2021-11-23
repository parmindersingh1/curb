import * as Highcharts from 'highcharts';

import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  config1: any = {};
  config2: any = {};

  constructor() {}

  ngOnInit(): void {
    this.config1 = this.getConfig();
    this.config2 = this.getConfig();
  }

  getConfig() {
    return {
      title: {
        text: ' ',
      },
      chart: {
        backgroundColor: '#2f3242',
        height: '30%',
      },

      yAxis: {
        title: {
          text: 'Count',
          style: {
            fontSize: 14,
            color: '#FFFFFF',
          },
        },
        tickLength: 2,
        labels: {
          style: {
            fontSize: 11,
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
        },
        // gridLineColor: 'transparent',
        // gridLineWidth: 0,
        lineWidth: 1,
        plotLines: [
          {
            color: '#FFFFFF',
            width: 1,
            value: 0,
          },
        ],
      },

      xAxis: {
        title: {
          text: 'Date Range',
          style: {
            fontSize: 14,
            color: '#FFFFFF',
          },
        },
        lineWidth: 1,
        gridLineColor: 'transparent',

        type: 'datetime',
        // tickInterval: 1000 * 3600 * 24 * 30, // 1 month
        labels: {
          dateTimeLabelFormats: {
            day: '%d %b %Y', //ex- 01 Jan 2016
          },
          formatter() {
            return Highcharts.dateFormat('%d %b %Y', this.value);
          },
          style: {
            fontSize: 11,
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
        },
      },

      // legend: {
      //   enabled: false,
      // },
      legend: {
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'middle',
        itemStyle: {
          color: '#FFFFFF',
        },
      },
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        color: '#FFFFFF',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
            style: {
              fontSize: 14,
              // fontWeight: 'bold',
              color: '#FFFFFF',
            },
          },
          pointStart: 0,
        },
      },

      series: [
        {
          name: 'EV Charging car',
          type: 'line',
          data: [
            [Date.UTC(2020, 0, 1), 100],
            [Date.UTC(2020, 0, 15), 110],
            [Date.UTC(2020, 1, 1), 300],
            [Date.UTC(2020, 1, 15), 310],
            [Date.UTC(2020, 2, 1), 300],
            [Date.UTC(2020, 2, 15), 310],
            [Date.UTC(2020, 3, 1), 200],
            [Date.UTC(2020, 3, 15), 210],
            [Date.UTC(2020, 4, 1), 200],
            [Date.UTC(2020, 4, 15), 210],
            [Date.UTC(2020, 5, 1), 100],
            [Date.UTC(2020, 5, 15), 110],
            [Date.UTC(2020, 6, 1), 300],
            [Date.UTC(2020, 6, 15), 310],
          ],
        },
        {
          name: 'Passenger Loading/Unloading',
          type: 'line',
          data: [
            [Date.UTC(2020, 0, 1), 300],
            [Date.UTC(2020, 0, 15), 320],
            [Date.UTC(2020, 1, 1), 100],
            [Date.UTC(2020, 1, 15), 120],
            [Date.UTC(2020, 2, 1), 200],
            [Date.UTC(2020, 2, 15), 220],
            [Date.UTC(2020, 3, 1), 300],
            [Date.UTC(2020, 3, 15), 320],
            [Date.UTC(2020, 4, 1), 100],
            [Date.UTC(2020, 4, 15), 120],
            [Date.UTC(2020, 5, 1), 300],
            [Date.UTC(2020, 5, 15), 320],
            [Date.UTC(2020, 6, 1), 200],
            [Date.UTC(2020, 6, 15), 220],
          ],
        },

        {
          name: 'Commerical Loading',
          type: 'line',
          data: [
            [Date.UTC(2020, 0, 1), 200],
            [Date.UTC(2020, 0, 15), 230],
            [Date.UTC(2020, 1, 1), 100],
            [Date.UTC(2020, 1, 15), 130],
            [Date.UTC(2020, 2, 1), 300],
            [Date.UTC(2020, 2, 15), 330],
            [Date.UTC(2020, 3, 1), 300],
            [Date.UTC(2020, 3, 15), 330],
            [Date.UTC(2020, 4, 1), 100],
            [Date.UTC(2020, 4, 15), 130],
            [Date.UTC(2020, 5, 1), 200],
            [Date.UTC(2020, 5, 15), 230],
            [Date.UTC(2020, 6, 1), 300],
            [Date.UTC(2020, 6, 15), 330],
          ],
        },

        {
          name: 'Rules Non-Compliance',
          type: 'line',
          data: [
            [Date.UTC(2020, 0, 1), 200],
            [Date.UTC(2020, 0, 15), 230],
            [Date.UTC(2020, 1, 1), 200],
            [Date.UTC(2020, 1, 15), 230],
            [Date.UTC(2020, 2, 1), 100],
            [Date.UTC(2020, 2, 15), 130],
            [Date.UTC(2020, 3, 1), 300],
            [Date.UTC(2020, 3, 15), 330],
            [Date.UTC(2020, 4, 1), 100],
            [Date.UTC(2020, 4, 15), 130],
            [Date.UTC(2020, 5, 1), 300],
            [Date.UTC(2020, 5, 15), 330],
            [Date.UTC(2020, 6, 1), 300],
            [Date.UTC(2020, 6, 15), 330],
          ],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      credits: {
        enabled: false,
      },
    };
  }
}
