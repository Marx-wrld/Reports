import { Button, Card, Col, Image, Nav, Row, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { profileActivity } from './data'
// import React from 'react'

// images
// import bgProfile from '@/assets/images/bg-profile.jpg'
import avatar1 from '@/assets/images/users/user.png'

// components
import { FormInput } from '@/components'
// import { url } from 'inspector'

const ProfilePages = () => {
	return (
		<>
			<div>
				<Row>
					<Col sm={12}>
						<div
							className="profile-bg-picture"
							// style={{ backgroundImage: url(${bgProfile}) }}
						>
							<span className="picture-bg-overlay" />
						</div>
						<div className="profile-user-box">
							<Row>
								<Col sm={6}>
									<div className="profile-user-img">
										<Image
											src={avatar1}
											className="avatar-lg rounded-circle"
											alt="user"
										/>
									</div>
									<div>
										<h4 className="mt-4 fs-17 ellipsis">William Aluku</h4>
										<p className="font-13"> Super Admin</p>
										<p className="text-muted mb-0">
											<small>Nairobi, Kenya</small>
										</p>
									</div>
								</Col>
								<Col sm={6}>
									<div className="d-flex justify-content-end align-items-center gap-2">
										<Button type="button" variant="soft-danger">
											<i className="ri-settings-2-line align-text-bottom me-1 fs-16 lh-1" />{' '}
											Edit Profile
										</Button>
										
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<Card className="p-0">
							<Card.Body className="p-0">
								<div className="profile-content">
									<Tab.Container defaultActiveKey="About">
										<Nav as="ul" justify className="nav-underline gap-0">
											<Nav.Item as="li">
												<Nav.Link
													as={Link}
													to="#"
													eventKey="About"
													type="button"
												>
													About
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link
													as={Link}
													type="button"
													to="#"
													eventKey="Settings"
												>
													Settings
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
											</Nav.Item>
										</Nav>
										<Tab.Content className="m-0 p-4">
											<Tab.Pane eventKey="About" id="aboutme" tabIndex={0}>
												<div className="profile-desk">
													<h5 className="text-uppercase fs-17 text-dark">
														William Aluku
													</h5>
													<div className="designation mb-4">
														Super Admin
													</div>
													<p className="text-muted fs-16">
														I have 10 years of experience designing for the web,
														and specialize in the areas of user interface
														design, interaction design, visual design and
														prototyping. I’ve worked with notable startups
														including Pearl Street Software.
													</p>
													<h5 className="mt-4 fs-17 text-dark">
														Contact Information
													</h5>
													<table className="table table-condensed mb-0 border-top">
														<tbody>
															<tr>
																<th scope="row">Url</th>
																<td>
																	<Link to="" className="ng-binding">
																		www.velecoity.co.ke
																	</Link>
																</td>
															</tr>
															<tr>
																<th scope="row">Email</th>
																<td>
																	<Link to="" className="ng-binding">
																		william@velocity.co.ke
																	</Link>
																</td>
															</tr>
															<tr>
																<th scope="row">Phone</th>
																<td className="ng-binding">+254 724 782317</td>
															</tr>
															<tr>
																<th scope="row">Skype</th>
																<td>
																	<Link to="" className="ng-binding">
																		WilliamAluku
																	</Link>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</Tab.Pane>

											<Tab.Pane eventKey="Settings" id="edit-profile">
												<div className="user-profile-content">
													<form>
														<Row className="row-cols-sm-2 row-cols-1">
															<FormInput
																name="fullName"
																label="Full Name"
																type="text"
																containerClass="mb-2"
																defaultValue="William Aluku"
															/>
															<FormInput
																name="email"
																label="Email"
																type="text"
																containerClass="mb-3"
																defaultValue="william@velocity.co.ke"
															/>
															<FormInput
																name="WebUrl"
																label="Website"
																type="text"
																containerClass="mb-3"
																defaultValue="www.veleocity.co.ke"
															/>
															<FormInput
																name="UserName"
																label="Username"
																type="text"
																containerClass="mb-3"
																defaultValue="William"
															/>
															<FormInput
																name="Password"
																label="Password"
																type="password"
																containerClass="mb-3"
																placeholder="6 - 15 Characters"
															/>
															<FormInput
																name="Password2"
																label="Re-Password"
																type="password"
																containerClass="mb-3"
																placeholder="6 - 15 Characters"
															/>
															<FormInput
																style={{ height: 125 }}
																name="About"
																label="About Me"
																type="textarea"
																containerClass="col-sm-12 mb-3"
																defaultValue={
																	'I have 10 years of experience designing for the web, and specialize in the areas of user interface design, interaction design, visual design and prototyping. I’ve worked with notable startups including Pearl Street Software.'
																}
															/>
														</Row>
														<Button variant="primary" type="submit">
															<i className="ri-save-line me-1 fs-16 lh-1" />{' '}
															Save
														</Button>
													</form>
												</div>
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default ProfilePages