import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

function About () {
    return (
        <Container className= "my-5">
            <Jumbotron className="my-5">
                <h1> About </h1>
            </Jumbotron>
            <div>
                <p>I went to Gagetown :( ...</p>
            </div>
        </Container>
    )
};

export default About;