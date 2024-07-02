// Import necessary dependencies and components
import React, { ReactNode, useEffect } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// Import images
import authImg from '@/assets/images/auth-img.jpg';
import logo from '@/assets/images/logo.png';
import logoDark from '@/assets/images/logo-dark.png';

// Define the props interface for AuthLayout
interface AccountLayoutProps {
  pageImage?: string;
  authTitle?: string;
  helpText?: string;
  bottomLinks?: ReactNode;
  isCombineForm?: boolean;
  children?: ReactNode;
  hasForm?: boolean;
  hasThirdPartyLogin?: boolean;
  userImage?: string;
  starterClass?: boolean;
}

// AuthLayout component
const AuthLayout = ({
  authTitle,
  helpText,
  bottomLinks,
  children,
  hasThirdPartyLogin,
  userImage,
  starterClass,
}: AccountLayoutProps) => {
  // Add and remove CSS classes for background styling on mount and unmount
  useEffect(() => {
    if (document.body) {
      document.body.classList.add('authentication-bg', 'position-relative');
    }

    return () => {
      if (document.body) {
        document.body.classList.remove('authentication-bg', 'position-relative');
      }
    };
  }, []);

  // Render the AuthLayout component
  return (
    <div className="authentication-bg position-relative">
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xxl={8} lg={10}>
              <Card className="overflow-hidden">
                <Row className="g-0">
                  {/* Left Column with Image */}
                  <Col lg={6} className="d-none d-lg-block p-2">
                    <Image src={authImg} alt="" className="img-fluid rounded h-100" />
                  </Col>
                  {/* Right Column with Logo and Content */}
                  <Col lg={6}>
                    <div className="d-flex flex-column h-100">
                      {/* Logo Section */}
                      <div className="auth-brand p-4">
                        <a href="index.html" className="logo-light">
                          {/* Logo with adjusted height to cover the entire width */}
                          <Image src={logo} alt="logo"/>
                        </a>
                        <a href="index.html" className="logo-dark">
                          <Image src={logoDark} alt="dark logo" height="22" />
                        </a>
                      </div>
                      {/* Content Section */}
                      <div
                        className={`p-4 my-auto ${starterClass ? 'text-center' : ''}`}
                      >
                        {userImage ? (
                          // Display user image if available
                          <div className="text-center w-75 m-auto">
                            <Image
                              src={userImage}
                              height={64}
                              alt="user-image"
                              className="rounded-circle img-fluid img-thumbnail avatar-xl"
                            />
                            <h4 className="text-center mt-3 fw-bold fs-20">
                              {authTitle}{' '}
                            </h4>
                            <p className="text-muted mb-4">{helpText}</p>
                          </div>
                        ) : (
                          // Display auth title and help text if no user image
                          <React.Fragment>
                            <h4 className="fs-20">{authTitle}</h4>
                            <p className="text-muted mb-3">{helpText}</p>
                          </React.Fragment>
                        )}

                        {children}

                        {/* {hasThirdPartyLogin && (
                          // Display third-party login buttons
                          <div className="text-center mt-4">
                            <p className="text-muted fs-16">Sign in with</p>
                            <div className="d-flex gap-2 justify-content-center mt-3">
                              <Link to="#" className="btn btn-soft-primary">
                                <i className="ri-facebook-circle-fill"></i>
                              </Link>
                              <Link to="#" className="btn btn-soft-danger">
                                <i className="ri-google-fill"></i>
                              </Link>
                              <Link to="#" className="btn btn-soft-info">
                                <i className="ri-twitter-fill"></i>
                              </Link>
                              <Link to="#" className="btn btn-soft-dark">
                                <i className="ri-github-fill"></i>
                              </Link>
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {bottomLinks}
        </Container>
      </div>
      {/* Footer Section */}
      <footer className="footer footer-alt fw-medium">
        <span className="text-dark">
          {new Date().getFullYear()} © Velocity Softwares | TransactXtract Statements
        </span>
      </footer>
    </div>
  );
};

// Export the AuthLayout component as the default export
export default AuthLayout;
