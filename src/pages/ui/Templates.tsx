import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPlus, faPaintBrush, faPen, faFilePdf, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const TemplatePage = () => {
    const cardData = [
        { id: 1, title: 'File Design & Upload', description: 'create digital stamps, signatures, logos and watermarks', link: '/digital_stamps', icon: 'plus' },
        { id: 2, title: 'Uploaded Files', description: 'View digital stamps, signatures, logos and watermarks', link: '/digital_files', icon: 'signature' },
        { id: 3, title: 'Statement Template', description: 'Edit and manage statement templates', link: '/statement_templates', icon: 'pdf' },
        { id: 4, title: 'Email Template', description: 'Manage email templates', link: '/email_templates', icon: 'email' },
        // Add more card objects as needed
    ];

    const handleCardClick = (link: string) => {
        console.log(`Navigating to: ${link}`);
        // Handle navigation or specific functionality based on the clicked card
    };

    const getIcon = (icon: string) => {
        switch (icon) {
            case 'plus':
                return <FontAwesomeIcon icon={faPlus} size="3x" />;
            case 'pdf':
                return <FontAwesomeIcon icon={faFilePdf} size="3x" />;
            case 'email':
                return <FontAwesomeIcon icon={faEnvelope} size="3x" color="#D14836" />;
            default:
                return <FontAwesomeIcon icon={faFolder} size="3x" />;
        }
    };

    return (
        <div>
            <h1>Template Page</h1>
            <Row>
                {cardData.map((card) => (
                    <Col md={4} key={card.id}>
                        <Card onClick={() => handleCardClick(card.link)} className="folder-card">
                            <div className="folder-icon">
                                {getIcon(card.icon)}
                            </div>
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Text>{card.description}</Card.Text>
                                {card.title === 'File Design & Upload' && (
                                    <Link to={card.link} className="btn btn-primary">
                                        Go to <FontAwesomeIcon icon={faPaintBrush} className="ml-1" />
                                    </Link>
                                )}
                                {card.title === 'Staement Template' && (
                                    <Link to={card.link} className="btn btn-primary">
                                        <FontAwesomeIcon icon={faPen} /> Generate
                                    </Link>
                                )}
                                {card.title === 'Email Template' && (
                                    <Link to={card.link} className="btn btn-danger">
                                        Generate <FontAwesomeIcon icon={faPaperPlane} className="ml-1" />
                                    </Link>
                                )}
                                {card.title !== 'File Design & Upload' && card.title !== 'PDF Template' && card.title !== 'Email Template' && (
                                    <Link to={card.link} className="btn btn-primary">
                                        Go to
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TemplatePage;
