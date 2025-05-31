import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { VscAccount, VscMortarBoard, VscOrganization, VscGlobe, VscRepo, VscCalendar } from "react-icons/vsc";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import ImagenCursoReact from "../assets/images/react.png"
import ImagenCursojs from "../assets/images/js.jpg"
import ImagenCursopsql from "../assets/images/psql.png"

const Perfil = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("user"));

    if (!token || !usuario) {
      alert("Debes loguearte antes de acceder a tu perfil.");
      navigate("/login");
    }
  }, [navigate]);

  return (
  <>
 <Navbar bg="primary" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand href="#home" className="text-white fw-bold">Bienvenido a tu perfil</Navbar.Brand>
          <Nav className="me-2 ">
            <Nav.Link href="#editar" className="d-flex align-items-center gap-2 text-white fw-bold"> <VscAccount size={24} /> <span>Editar mi perfil</span></Nav.Link>
            <Nav.Link href="#cursos"className="d-flex align-items-center gap-2 text-white fw-bold"><VscMortarBoard size={24} /><span>Mis Certificados</span></Nav.Link>
            <Nav.Link href="#certificados"className="d-flex align-items-center gap-2 text-white fw-bold"><VscOrganization size={24} />Comunidad</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

<Container className="my-4 mt-5">
      <Row className="g-4 justify-content-center">
        <Col xs={12} sm={6} md={4} className="d-flex">
 <Card style={{ width: '100%' }} className="h-100 w-100 d-flex flex-column">
      <Card.Img variant="top" src={ImagenCursoReact}  style={{ height: '200px', objectFit: 'cover' }} />

      <Card.Body className="d-flex flex-column">

        <Card.Title className="fw-bold text-center">REACT</Card.Title>

        <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscGlobe style={{ marginRight: '8px' }} /> <span> e-learning </span>
          </Card.Text>

           <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscRepo style={{ marginRight: '8px' }} /> <span> Clases Lunes y Miércoles </span>
          </Card.Text>

          <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscCalendar style={{ marginRight: '8px' }} /> <span> Inicio: 15 mayo 2025 </span>
          </Card.Text>

          <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscCalendar style={{ marginRight: '8px' }} /> <span> Término: 15 junio 2025 </span>
          </Card.Text>

         <div className="mt-auto d-flex justify-content-center mt-5">
    <Button style={{ backgroundColor: '#F065AF', borderColor: '#F065AF' }}>
      <strong>Ir al curso</strong>
    </Button>
  </div>
      </Card.Body>
    </Card>
     </Col>

    <Col xs={12} sm={6} md={4} className="d-flex">
 <Card className="h-100 w-100 d-flex flex-column" style={{ width: '100%' }}>
      <Card.Img variant="top" src={ImagenCursojs}  style={{ height: '200px', objectFit: 'cover' }} />

      <Card.Body className="d-flex flex-column">

        <Card.Title className="fw-bold text-center">FUNDAMENTOS DE JAVA SCRIPT</Card.Title>

        <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscGlobe style={{ marginRight: '8px' }} /> <span> e-learning </span>
          </Card.Text>

           <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscRepo style={{ marginRight: '8px' }} /> <span> Clases Lunes y Miércoles </span>
          </Card.Text>

          <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscCalendar style={{ marginRight: '8px' }} /> <span> Inicio: 1 mayo 2025 </span>
          </Card.Text>

          <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscCalendar style={{ marginRight: '8px' }} /> <span> Término: 1 junio 2025 </span>
          </Card.Text>

         <div className="mt-auto d-flex justify-content-center mt-4">
    <Button style={{ backgroundColor: '#F065AF', borderColor: '#F065AF' }}>
      <strong>Ir al curso</strong>
    </Button>
  </div>
      </Card.Body>
    </Card>
     </Col>

       <Col xs={12} sm={6} md={4} className="d-flex">
 <Card className="h-100 w-100 d-flex flex-column" style={{ width: '100%' }}>
      <Card.Img variant="top" src={ImagenCursopsql}  style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">

        <Card.Title className="fw-bold text-center">BASES DE DATOS PSQL</Card.Title>

        <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscGlobe style={{ marginRight: '8px' }} /> <span> e-learning </span>
          </Card.Text>

           <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscRepo style={{ marginRight: '8px' }} /> <span> Clases Lunes y Miércoles </span>
          </Card.Text>

          <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscCalendar style={{ marginRight: '8px' }} /> <span> Inicio: 1 junio 2025 </span>
          </Card.Text>

          <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
         <VscCalendar style={{ marginRight: '8px' }} /> <span> Término: 30 junio 2025 </span>
          </Card.Text>

         <div className=" mt-auto d-flex justify-content-center mt-4">
    <Button style={{ backgroundColor: '#F065AF', borderColor: '#F065AF' }}>
      <strong>Ir al curso</strong>
    </Button>
  </div>
      </Card.Body>
    </Card>
     </Col>
      </Row>
    </Container>
</>
    
  );
};

export default Perfil;


