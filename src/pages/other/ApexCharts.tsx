import { Card, Col, Row } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'

import {
	apexColumnChartOpts,
	multipleYAxisChartOpts,
	AreaApexOpt,
	lineChartOpts,
	SimplePieOpt,
} from './data'

// components
import { PageBreadcrumb } from '@/components'

const ApexCharts = () => {
	return (
		<>
			<PageBreadcrumb title="Apex Charts" subName="chats" />
			<Row>
				<Col xl={6}>
					<Card>
						<Card.Body>
							<h4 className="header-title mb-4">Basic Area Chart</h4>
							<div>
								<ReactApexChart
									className="apex-charts"
									options={AreaApexOpt}
									height={380}
									series={AreaApexOpt.series}
									type="area"
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col xl={6}>
					<Card>
						<Card.Body>
							<h4 className="header-title mb-4">Basic Column Chart </h4>
							<div>
								<ReactApexChart
									className="apex-charts"
									options={apexColumnChartOpts}
									height={380}
									series={apexColumnChartOpts.series}
									type="bar"
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>

			</Row>

			<Row>
				<Col xl={6}>
					<Card>
						<Card.Body>
							<h4 className="header-title mb-4">Simple line chart</h4>
							<div>
								<ReactApexChart
									className="apex-charts"
									options={lineChartOpts}
									height={380}
									series={lineChartOpts.series}
									type="line"
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col xl={6}>
					<Card>
						<Card.Body>
							<div>
								<h4 className="header-title">Multiple Y-Axis Chart</h4>
								<ReactApexChart
									className="apex-charts"
									options={multipleYAxisChartOpts}
									height={380}
									series={multipleYAxisChartOpts.series}
									type="line"
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col xl={6}>
					<Card>
						<Card.Body>
							<h4 className="header-title">Simple Pie Chart</h4>
							<div>
								<ReactApexChart
									className="apex-charts"
									options={SimplePieOpt}
									height={320}
									series={SimplePieOpt.series}
									type="pie"
								/>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
	
		</>
	)
}

export default ApexCharts
