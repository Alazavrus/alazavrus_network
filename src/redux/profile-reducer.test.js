import profileReducer, {addPost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: "Сискя", likeCount: 10},
        {id: 2, message: "Пискя", likeCount: 50}
    ]
}

it('post add', () => {
    let action = addPost('123');

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it('post add message', () => {
    let action = addPost('123');

    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('123');
})