import { ApexOptions } from 'apexcharts'

function generateData(baseval: number, count: number, yrange: any): number[] {
	let i = 0
	const series: any = []
	while (i < count) {
		const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1
		const y =
			Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
		const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

		series.push([x, y, z])
		baseval += 86400000
		i++
	}
	return series
}

function generateData1(baseval1: number, count: number, yrange: any): number[] {
	let i = 0
	const series: any = []
	while (i < count) {
		//const x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
		const y =
			Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
		const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

		series.push([baseval1, y, z])
		baseval1 += 86400000
		i++
	}
	return series
}

const seriesData = [
	{
		x: new Date(2016, 1, 1),
		y: [51.98, 56.29, 51.59, 53.85],
	},
	{
		x: new Date(2016, 2, 1),
		y: [53.66, 54.99, 51.35, 52.95],
	},
	{
		x: new Date(2016, 3, 1),
		y: [52.96, 53.78, 51.54, 52.48],
	},
	{
		x: new Date(2016, 4, 1),
		y: [52.54, 52.79, 47.88, 49.24],
	},
	{
		x: new Date(2016, 5, 1),
		y: [49.1, 52.86, 47.7, 52.78],
	},
	{
		x: new Date(2016, 6, 1),
		y: [52.83, 53.48, 50.32, 52.29],
	},
	{
		x: new Date(2016, 7, 1),
		y: [52.2, 54.48, 51.64, 52.58],
	},
	{
		x: new Date(2016, 8, 1),
		y: [52.76, 57.35, 52.15, 57.03],
	},
	{
		x: new Date(2016, 9, 1),
		y: [57.04, 58.15, 48.88, 56.19],
	},
	{
		x: new Date(2016, 10, 1),
		y: [56.09, 58.85, 55.48, 58.79],
	},
	{
		x: new Date(2016, 11, 1),
		y: [58.78, 59.65, 58.23, 59.05],
	},
	{
		x: new Date(2017, 0, 1),
		y: [59.37, 61.11, 59.35, 60.34],
	},
	{
		x: new Date(2017, 1, 1),
		y: [60.4, 60.52, 56.71, 56.93],
	},
	{
		x: new Date(2017, 2, 1),
		y: [57.02, 59.71, 56.04, 56.82],
	},
	{
		x: new Date(2017, 3, 1),
		y: [56.97, 59.62, 54.77, 59.3],
	},
	{
		x: new Date(2017, 4, 1),
		y: [59.11, 62.29, 59.1, 59.85],
	},
	{
		x: new Date(2017, 5, 1),
		y: [59.97, 60.11, 55.66, 58.42],
	},
	{
		x: new Date(2017, 6, 1),
		y: [58.34, 60.93, 56.75, 57.42],
	},
	{
		x: new Date(2017, 7, 1),
		y: [57.76, 58.08, 51.18, 54.71],
	},
	{
		x: new Date(2017, 8, 1),
		y: [54.8, 61.42, 53.18, 57.35],
	},
	{
		x: new Date(2017, 9, 1),
		y: [57.56, 63.09, 57.0, 62.99],
	},
	{
		x: new Date(2017, 10, 1),
		y: [62.89, 63.42, 59.72, 61.76],
	},
	{
		x: new Date(2017, 11, 1),
		y: [61.71, 64.15, 61.29, 63.04],
	},
]

const series = {
	monthDataSeries1: {
		prices: [
			8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85,
			8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25,
			8600.65, 8881.1, 9340.85,
		],
		dates: [
			'13 Nov 2017',
			'14 Nov 2017',
			'15 Nov 2017',
			'16 Nov 2017',
			'17 Nov 2017',
			'20 Nov 2017',
			'21 Nov 2017',
			'22 Nov 2017',
			'23 Nov 2017',
			'24 Nov 2017',
			'27 Nov 2017',
			'28 Nov 2017',
			'29 Nov 2017',
			'30 Nov 2017',
			'01 Dec 2017',
			'04 Dec 2017',
			'05 Dec 2017',
			'06 Dec 2017',
			'07 Dec 2017',
			'08 Dec 2017',
		],
	},
	monthDataSeries2: {
		prices: [
			8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3,
			8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9040.85, 8340.7, 8165.5,
			8122.9, 8107.85, 8128.0,
		],
		dates: [
			'13 Nov 2017',
			'14 Nov 2017',
			'15 Nov 2017',
			'16 Nov 2017',
			'17 Nov 2017',
			'20 Nov 2017',
			'21 Nov 2017',
			'22 Nov 2017',
			'23 Nov 2017',
			'24 Nov 2017',
			'27 Nov 2017',
			'28 Nov 2017',
			'29 Nov 2017',
			'30 Nov 2017',
			'01 Dec 2017',
			'04 Dec 2017',
			'05 Dec 2017',
			'06 Dec 2017',
			'07 Dec 2017',
			'08 Dec 2017',
		],
	},
	monthDataSeries3: {
		prices: [
			7114.25, 7126.6, 7116.95, 7203.7, 7233.75, 7451.0, 7381.15, 7348.95,
			7347.75, 7311.25, 7266.4, 7253.25, 7215.45, 7266.35, 7315.25, 7237.2,
			7191.4, 7238.95, 7222.6, 7217.9, 7359.3, 7371.55, 7371.15, 7469.2,
			7429.25, 7434.65, 7451.1, 7475.25, 7566.25, 7556.8, 7525.55, 7555.45,
			7560.9, 7490.7, 7527.6, 7551.9, 7514.85, 7577.95, 7592.3, 7621.95,
			7707.95, 7859.1, 7815.7, 7739.0, 7778.7, 7839.45, 7756.45, 7669.2,
			7580.45, 7452.85, 7617.25, 7701.6, 7606.8, 7620.05, 7513.85, 7498.45,
			7575.45, 7601.95, 7589.1, 7525.85, 7569.5, 7702.5, 7812.7, 7803.75,
			7816.3, 7851.15, 7912.2, 7972.8, 8145.0, 8161.1, 8121.05, 8071.25, 8088.2,
			8154.45, 8148.3, 8122.05, 8132.65, 8074.55, 7952.8, 7885.55, 7733.9,
			7897.15, 7973.15, 7888.5, 7842.8, 7838.4, 7909.85, 7892.75, 7897.75,
			7820.05, 7904.4, 7872.2, 7847.5, 7849.55, 7789.6, 7736.35, 7819.4,
			7875.35, 7871.8, 8076.5, 8114.8, 8193.55, 8217.1, 8235.05, 8215.3, 8216.4,
			8301.55, 8235.25, 8229.75, 8201.95, 8164.95, 8107.85, 8128.0, 8122.9,
			8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2,
		],
		dates: [
			'02 Jun 2017',
			'05 Jun 2017',
			'06 Jun 2017',
			'07 Jun 2017',
			'08 Jun 2017',
			'09 Jun 2017',
			'12 Jun 2017',
			'13 Jun 2017',
			'14 Jun 2017',
			'15 Jun 2017',
			'16 Jun 2017',
			'19 Jun 2017',
			'20 Jun 2017',
			'21 Jun 2017',
			'22 Jun 2017',
			'23 Jun 2017',
			'27 Jun 2017',
			'28 Jun 2017',
			'29 Jun 2017',
			'30 Jun 2017',
			'03 Jul 2017',
			'04 Jul 2017',
			'05 Jul 2017',
			'06 Jul 2017',
			'07 Jul 2017',
			'10 Jul 2017',
			'11 Jul 2017',
			'12 Jul 2017',
			'13 Jul 2017',
			'14 Jul 2017',
			'17 Jul 2017',
			'18 Jul 2017',
			'19 Jul 2017',
			'20 Jul 2017',
			'21 Jul 2017',
			'24 Jul 2017',
			'25 Jul 2017',
			'26 Jul 2017',
			'27 Jul 2017',
			'28 Jul 2017',
			'31 Jul 2017',
			'01 Aug 2017',
			'02 Aug 2017',
			'03 Aug 2017',
			'04 Aug 2017',
			'07 Aug 2017',
			'08 Aug 2017',
			'09 Aug 2017',
			'10 Aug 2017',
			'11 Aug 2017',
			'14 Aug 2017',
			'16 Aug 2017',
			'17 Aug 2017',
			'18 Aug 2017',
			'21 Aug 2017',
			'22 Aug 2017',
			'23 Aug 2017',
			'24 Aug 2017',
			'28 Aug 2017',
			'29 Aug 2017',
			'30 Aug 2017',
			'31 Aug 2017',
			'01 Sep 2017',
			'04 Sep 2017',
			'05 Sep 2017',
			'06 Sep 2017',
			'07 Sep 2017',
			'08 Sep 2017',
			'11 Sep 2017',
			'12 Sep 2017',
			'13 Sep 2017',
			'14 Sep 2017',
			'15 Sep 2017',
			'18 Sep 2017',
			'19 Sep 2017',
			'20 Sep 2017',
			'21 Sep 2017',
			'22 Sep 2017',
			'25 Sep 2017',
			'26 Sep 2017',
			'27 Sep 2017',
			'28 Sep 2017',
			'29 Sep 2017',
			'03 Oct 2017',
			'04 Oct 2017',
			'05 Oct 2017',
			'06 Oct 2017',
			'09 Oct 2017',
			'10 Oct 2017',
			'11 Oct 2017',
			'12 Oct 2017',
			'13 Oct 2017',
			'16 Oct 2017',
			'17 Oct 2017',
			'18 Oct 2017',
			'19 Oct 2017',
			'23 Oct 2017',
			'24 Oct 2017',
			'25 Oct 2017',
			'26 Oct 2017',
			'27 Oct 2017',
			'30 Oct 2017',
			'31 Oct 2017',
			'01 Nov 2017',
			'02 Nov 2017',
			'03 Nov 2017',
			'06 Nov 2017',
			'07 Nov 2017',
			'08 Nov 2017',
			'09 Nov 2017',
			'10 Nov 2017',
			'13 Nov 2017',
			'14 Nov 2017',
			'15 Nov 2017',
			'16 Nov 2017',
			'17 Nov 2017',
			'20 Nov 2017',
			'21 Nov 2017',
			'22 Nov 2017',
			'23 Nov 2017',
			'24 Nov 2017',
			'27 Nov 2017',
			'28 Nov 2017',
		],
	},
}

// Basic Area Chart
export const AreaApexOpt: ApexOptions = {
	chart: {
		height: 380,
		type: 'area',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: 2,
		curve: 'straight',
	},
	colors: ['#3bc0c3'],
	series: [
		{
			name: 'STOCK ABC',
			data: series.monthDataSeries1.prices,
		},
	],
	title: {
		text: 'Fundamental Analysis of Stocks',
		align: 'left',
	},
	subtitle: {
		text: 'Price Movements',
		align: 'left',
	},
	labels: series.monthDataSeries1.dates,
	xaxis: {
		type: 'datetime',
	},
	yaxis: {
		opposite: false,
	},
	legend: {
		horizontalAlign: 'left',
	},
	grid: {
		borderColor: '#f1f3fa',
	},
	responsive: [
		{
			breakpoint: 600,
			options: {
				chart: {
					toolbar: {
						show: false,
					},
				},
				legend: {
					show: false,
				},
			},
		},
	],
}

//   Basic Column Chart
export const apexColumnChartOpts: ApexOptions = {
	chart: {
		height: 380,
		type: 'bar',
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
			// endingShape: 'rounded',
			columnWidth: '55%',
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent'],
	},
	colors: ['#3bc0c3', '#4489e4', '#33b0e0'],
	series: [
		{
			name: 'Net Profit',
			data: [82, 50, 55, 42, 45, 48, 52, 53, 41],
		},
		{
			name: 'Revenue',
			data: [60, 42, 82, 62, 61, 68, 63, 60, 66],
		},
		{
			name: 'Free Cash Flow',
			data: [70, 60, 95, 82, 87, 105, 91, 114, 94],
		},
	],
	xaxis: {
		categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
	},
	legend: {
		offsetY: 5,
	},
	yaxis: {
		title: {
			text: '$ (thousands)',
		},
	},
	fill: {
		opacity: 1,
	},
	grid: {
		row: {
			colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
			opacity: 0.2,
		},
		borderColor: '#f1f3fa',
		padding: {
			bottom: 10,
		},
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return '$ ' + val + ' thousands'
			},
		},
	},
}

//   Simple line chart
export const lineChartOpts: ApexOptions = {
	chart: {
		height: 380,
		type: 'line',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	colors: ['#edc755'],
	stroke: {
		width: [4],
		curve: 'straight',
	},
	series: [
		{
			name: 'Desktops',
			data: [40, 35, 55, 60, 33, 70, 80, 96, 130],
		},
	],
	title: {
		text: 'Product Trends by Month',
		align: 'center',
	},
	grid: {
		row: {
			colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
			opacity: 0.2,
		},
		borderColor: '#edc755',
	},
	labels: series.monthDataSeries1.dates,
	xaxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
	},
	responsive: [
		{
			breakpoint: 600,
			options: {
				chart: {
					toolbar: {
						show: false,
					},
				},
				legend: {
					show: false,
				},
			},
		},
	],
}


//   Multiple Y-Axis Chart
export const multipleYAxisChartOpts: ApexOptions = {
	chart: {
		height: 380,
		type: 'line',
		stacked: false,
		toolbar: {
			show: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: [0, 0, 3],
	},
	series: [
		{
			name: 'Income',
			type: 'column',
			data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
		},
		{
			name: 'Cashflow',
			type: 'column',
			data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
		},
		{
			name: 'Revenue',
			type: 'line',
			data: [20, 29, 37, 36, 44, 45, 50, 58],
		},
	],
	colors: ['#3bc0c3', '#39afd1', '#fa5c7c'],
	xaxis: {
		categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
	},
	yaxis: [
		{
			axisTicks: {
				show: true,
			},
			axisBorder: {
				show: true,
				color: '#675db7',
			},
			labels: {
				// style: {
				//     color: '#675db7',
				// }
			},
			title: {
				text: 'Income (thousand crores)',
			},
		},

		{
			opposite: true,
			axisTicks: {
				show: true,
			},
			axisBorder: {
				show: true,
				color: '#e36498',
			},
			labels: {
				// style: {
				//     color: ["#e36498"],
				// }
			},
			title: {
				text: 'Revenue (thousand crores)',
			},
		},
	],
	tooltip: {
		followCursor: true,
		y: {
			formatter: function (y) {
				if (typeof y !== 'undefined') {
					return y + ' thousand crores'
				}
				return y
			},
		},
	},
	grid: {
		borderColor: '#f1f3fa',
		padding: {
			bottom: 10,
		},
	},
	legend: {
		offsetY: 7,
	},
	responsive: [
		{
			breakpoint: 600,
			options: {
				yaxis: {
					show: false,
				},
				legend: {
					show: false,
				},
			},
		},
	],
}

//   Simple Pie Chart
const colors1 = ['#3bc0c3', '#6c757d', '#4489e4', '#d03f3f', '#edc755']
export const SimplePieOpt: ApexOptions = {
	chart: {
		height: 320,
		type: 'pie',
	},
	series: [60, 40, 32, 55, 18],
	labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
	colors: colors1,
	legend: {
		show: true,
		position: 'bottom',
		horizontalAlign: 'center',
		// verticalAlign: "middle",
		floating: false,
		fontSize: '14px',
		offsetX: 0,
		offsetY: 7,
	},
	responsive: [
		{
			breakpoint: 600,
			options: {
				chart: {
					height: 240,
				},
				legend: {
					show: false,
				},
			},
		},
	],
}
