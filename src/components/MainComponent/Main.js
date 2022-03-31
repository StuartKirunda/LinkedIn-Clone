/* eslint-disable jsx-a11y/anchor-is-valid */
import PostModal from "../PostModal/PostModal";
import { Article, Container, Content, Description, ShareBox, SharedArticle, SharedImage, SocialActions, SocialCounts } from "./Main.styles";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
    const [showModal, setShowModal] = useState('close');

    useEffect(() => {
        props.getArticles();
    }, [props]);

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;

            default:
                setShowModal("close");
                break;
        }
    };

    return (
        <>

            <Container>
                <ShareBox>

                    <div>
                        {props.user && props.user.photoURL ? (
                            <img src={props.user.photoURL} alt="" />) : (<img src="/images/user.svg" alt="" />)
                        }
                        <button onClick={handleClick} disabled={props.loading ? true : false}>Start a post</button>
                    </div>

                    <div>
                        <button>
                            <img src="/images/photo-icon.svg" alt="" />
                            <span>Photo</span>
                        </button>
                        <button>
                            <img src="/images/video-icon.svg" alt="" />
                            <span>Video</span>
                        </button>
                        <button>
                            <img src="/images/event-icon.svg" alt="" />
                            <span>Event</span>
                        </button>
                        <button>
                            <img src="/images/article-icon.svg" alt="" />
                            <span>Article</span>
                        </button>
                    </div>
                </ShareBox>
                {
                    props.articles.length === 0 ?
                        (<p>There are no articles</p>)
                        :
                        <Content>
                            {
                                props.loading && <img src='/images/spin-loader.svg' alt="" />
                            }
                            {props.articles.length > 0 && props.articles.map((article, key) => (

                                <Article key={key}>
                                    <SharedArticle>
                                        <a>
                                            <img src={article.actor.image} alt="" />
                                            <div>
                                                <span>{article.actor.title}</span>
                                                <span>{article.actor.description}</span>
                                                <span>{article.actor.date.toDate().toLocaleDateString}</span>
                                            </div>
                                        </a>
                                        <button>
                                            <img src="/images/ellipsis.svg" alt="" />
                                        </button>
                                    </SharedArticle>
                                    <Description>{article.description}</Description>
                                    <SharedImage>
                                        <a>
                                            {!article.sharedImg && article.video ? <ReactPlayer width={'100%'} url={article.video} /> : (article.sharedImg && <img src={article.sharedImg} alt="" />)}
                                        </a>
                                    </SharedImage>
                                    <SocialCounts>
                                        <li>
                                            <button>
                                                <img src="/images/Like.svg" alt="" />
                                                <img src="/images/react.svg" alt="" />
                                                <span>56</span>
                                            </button>
                                        </li>
                                        <li>
                                            <a>
                                                {article.comments}
                                            </a>
                                        </li>
                                    </SocialCounts>

                                    <SocialActions>
                                        <button>
                                            <img src="/images/like-icon.svg" alt="" />
                                            <span>Like</span>
                                        </button>
                                        <button>
                                            <img src="/images/comments.svg" alt="" />
                                            <span>Comments</span>
                                        </button>
                                        <button>
                                            <img src="/images/share.svg" alt="" />
                                            <span>Share</span>
                                        </button>
                                        <button>
                                            <img src="/images/send.svg" alt="" />
                                            <span>Send</span>
                                        </button>
                                    </SocialActions>

                                </Article>
                            ))}
                        </Content>
                }
                <PostModal showModal={showModal} handleClick={handleClick} />
            </Container>

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);