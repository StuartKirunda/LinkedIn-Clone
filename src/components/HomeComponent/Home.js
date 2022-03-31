/* eslint-disable jsx-a11y/anchor-is-valid */
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Leftside from "../LeftsideComponent/Leftside";
import Main from "../MainComponent/Main";
import Rightside from "../RightsideComponent/Rightside";
import { Container, Layout, Section } from "./Home.styles";


const Home = (props) => {
    return (
        <Container>
            {!props.user && <Redirect to="/" />}
            <Section>
                <h5>
                    <a>Hiring in a hurry? -</a>
                </h5>
                <p>
                    Find talented pros in record time with upwork and keep business moving.
                </p>
            </Section>
            <Layout>
                <Leftside />
                <Main />
                <Rightside />
            </Layout>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps,)(Home);