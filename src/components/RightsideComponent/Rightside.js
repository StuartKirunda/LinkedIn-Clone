/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, BannerCard, Container, FeedList, FollowCard, Recommendation, Title } from "./Rightside.styles";


const Rightside = (props) => {
    return (
        <Container>
            <FollowCard>

                <Title>
                    <h2>Add to your feed</h2>
                    <img src="/images/feed-icon.svg" alt="" />
                </Title>

                <FeedList>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Linkedin</span>
                            <button>Follow</button>
                        </div>
                    </li>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Video</span>
                            <button>Follow</button>
                        </div>
                    </li>
                </FeedList>

                <Recommendation>
                    View all recommendations
                    <img src="/images/right-icon.svg" alt="" />
                </Recommendation>

            </FollowCard>

            <BannerCard>
                <img
                    src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
                    alt=""
                />
            </BannerCard>
        </Container>
    );
};

export default Rightside;