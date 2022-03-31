/* eslint-disable jsx-a11y/anchor-is-valid */
import { connect } from "react-redux";
import { AddPhotoText, ArtCard, CardBackground, CommunityCard, Container, Item, Link, Photo, UserInfo, Widget } from "./Leftside.styles";


const Leftside = (props) => {
    return (
        <Container>
            <ArtCard>
                <UserInfo>
                    <CardBackground />
                    <a>
                        <Photo />
                        <Link>Welcome, {props.user ? props.user.displayName : "there"}!</Link>
                    </a>
                    <a>
                        <AddPhotoText>Add a photo</AddPhotoText>
                    </a>
                </UserInfo>
                <Widget>
                    <a>
                        <div>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <img src="/images/widget-icon.svg" alt="" />
                    </a>
                </Widget>
                <Item>
                    <span>
                        <img src="/images/item-icon.svg" alt="" />
                        My Items
                    </span>
                </Item>
            </ArtCard>

            <CommunityCard>
                <a>
                    <span>Groups</span>
                </a>
                <a>
                    <span>
                        Events
                        <img src="/images/plus-icon.svg" alt="" />
                    </span>
                </a>
                <a>
                    <span>Follow Hashtags</span>
                </a>
                <a>
                    <span>Discover More</span>
                </a>
            </CommunityCard>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};
export default connect(mapStateToProps)(Leftside);