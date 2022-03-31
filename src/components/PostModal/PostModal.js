// @ts-nocheck
import { AssetButton, AttachAssets, Container, Content, Editor, Header, PostButton, ShareComment, ShareCreation, SharedContent, UploadImage, UserInfo } from "./PostModal.styles";
import { useState } from "react";
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { serverTimestamp } from 'firebase/firestore';
import { postArticleAPI } from "../../actions";

const PostModal = (props) => {
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('');

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not an image, the file is a ${typeof image}`);
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea = (area) => {
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: serverTimestamp(),
        };

        props.postArticle(payload);
        reset(e);
    };

    const reset = (e) => {
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e);
    };

    return (
        <>
            {props.showModal === 'open' &&
                <Container>

                    <Content className="content">

                        <Header>
                            <h2>Create a post</h2>
                            <button onClick={(event) => reset(event)}>
                                <img src="/images/close-icon.svg" alt="" />
                            </button>
                        </Header>

                        <SharedContent>

                            <UserInfo>
                                {props.user.photoUrl ? (<img src={props.user.photoUrl} alt="" />) : (<img src="/images/user.svg" alt="" />)}
                                <span>{props.user.displayName}</span>
                            </UserInfo>

                            <Editor>
                                <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)} placeholder="Lets Talk..." autoFocus={true} />
                                {assetArea === 'image' ?
                                    <UploadImage>
                                        <input type={"file"} accept="image/gif, image/jpeg, image/png" name="image" id="file" style={{ display: "none" }} onChange={handleChange}
                                        />
                                        <p>
                                            <label htmlFor="file">Select an image</label>
                                        </p>
                                        {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                                    </UploadImage>
                                    : assetArea === 'media' &&
                                    <>
                                        <input type={"text"} placeholder="Select a video link" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                                        {videoLink && (
                                            <ReactPlayer width={"auto"} url={videoLink} />
                                        )}
                                    </>
                                }
                            </Editor>

                        </SharedContent>

                        <ShareCreation>

                            <AttachAssets>

                                <AssetButton onClick={() => switchAssetArea('image')}>
                                    <img src="/images/share-image.svg" alt="" />
                                </AssetButton>

                                <AssetButton onClick={() => switchAssetArea('media')}>
                                    <img src="/images/share-video.svg" alt="" />
                                </AssetButton>

                            </AttachAssets>

                            <ShareComment>

                                <AssetButton>
                                    <img src="/images/share-comment.svg" alt="" />
                                    Anyone
                                </AssetButton>

                            </ShareComment>

                            <PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>Post</PostButton>

                        </ShareCreation>

                    </Content>

                </Container>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);