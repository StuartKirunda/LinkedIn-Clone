import db, { auth, provider, storage } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
// import { set } from 'firebase/database';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
});

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
});

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert(error.message));
    };
}

export function getUserAuth() {
    return (dispatch) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        });
    };
}

export function signOutAPI() {
    return (dispatch) => {
        signOut(auth).then(() => {
            dispatch(setUser(null));
        })
            .catch((error) => {
                console.log(error.message);
            });
    };
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image !== '') {
            const uploadRef = ref(storage, `images/${payload.image.name}`);
            const upload = uploadBytesResumable(uploadRef, payload.image);
            upload.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Progress: ${progress}%`);
                if (snapshot.state === 'running') {
                    console.log(`Progress: ${progress}%`);
                }
            }, (error) => console.log(error.code),
                async () => {
                    const downloadUrl = await getDownloadURL(upload.snapshot.ref);
                    addDoc(collection(db, "articles"), {
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            image: payload.user.photoURL,
                        },
                        video: payload.video,
                        sharedImg: downloadUrl,
                        comments: 0,
                        description: payload.description,
                    });
                    dispatch(setLoading(false));
                });
        } else if (payload.video) {
            addDoc(collection(db, "articles"), {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
            });
            dispatch(setLoading(false));
        }
    };
};

export const getArticlesAPI = () => {
    return (dispatch) => {
        let payload;

        const q = query(collection(db, "articles"), orderBy("actor.date", 'desc'));
        onSnapshot(q, (snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data());
            dispatch(getArticles(payload));
        });
    };
};
