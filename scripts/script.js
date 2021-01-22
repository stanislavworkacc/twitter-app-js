class FetchData {
    getResourse = async url => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error('Пройзошла ошибка' + res.status)
        }
        return res.json();
    };

    getPost = async () => await this.getResourse('db/dataBase.json');
};

class Twitter {
    constructor({ user, listElem, modalElems, tweetElems}) {
        const fetchData = new FetchData(); //создаем поле локально
        this.user = user;
        this.tweets = new Posts(); //all posts
        this.elements = {
            listElem: document.querySelector(listElem),
            modal: modalElems,
            tweetElems
        };

        fetchData.getPost()
            .then(data => {
                data.forEach(item => {
                    this.tweets.addPost(item)
                })
                this.showAllPost();
            });
        
            this.elements.modal.forEach(this.handlerModal, this); ///this внутри handle modal - TWITTER
            //forEach(elem => this.handlerModal.bind(this, elem)
            this.elements.tweetElems.forEach(this.addTweet, this);
    }

    renderPosts(posts) {
        this.elements.listElem.textContent = '';
        
        posts.forEach(({ id, userName, nickname, text, img, likes = 0, getDate}) => {
            this.elements.listElem.insertAdjacentHTML('beforeend', `
            <li>
							<article class="tweet">
								<div class="row">
									<img class="avatar" src="images/${nickname}.jpg" alt="">
									<div class="tweet__wrapper">
										<header class="tweet__header">
											<h3 class="tweet-author">${userName}
												<span class="tweet-author__add tweet-author__nickname">@${nickname}</span>
												<time class="tweet-author__add tweet__date">${getDate()}</time>
											</h3>
											<button class="tweet__delete-button chest-icon" data-id="${id}"></button>
										</header>
										<div class="tweet-post">
											<p class="tweet-post__text">${text}</p>
                                            ${img ?
                                                `<figure class="tweet-post__image">
												<img src="${img}" alt="${nickname}">
											</figure>` : ''}
										</div>
									</div>
								</div>
								<footer>
									<button class="tweet__like">
										${likes}
									</button>
								</footer>
							</article>
						</li>
            `);
        });
    };

    showUserPost() {

    };

    showLikesPost() {

    };

    showAllPost() {
        this.renderPosts(this.tweets.posts);
    };

    handlerModal({button, modal, overlay, close}) {
        const buttonElem = document.querySelector(button);
        const modalElem = document.querySelector(modal);
        const overlayElem = document.querySelector(overlay);
        const closeElem = document.querySelector(close);

        const openModal = () => {
            modalElem.style.display = 'block';
        };

        const closeModal = (elem, event) => { //ивент всегда приходит последним
            const target = event.target;
            if(target === elem) {
                modalElem.style.display = 'none';
            }
        };

        buttonElem.addEventListener('click', openModal);

        closeElem.addEventListener('click', closeModal.bind(null, closeElem));
        overlayElem.addEventListener('click', closeModal.bind(null, overlayElem));

        this.handlerModal.closeModal = () => {
            modalElem.style.display = 'none';
        }
    };

    addTweet({text, img, submit}) {
        const textElem = document.querySelector(text);
        const imgElem = document.querySelector(img);
        const submitElem = document.querySelector(submit);

        let imgUrl = '';
        let tempString = textElem.innerHTML;

        submitElem.addEventListener('click', () => {
            this.tweets.addPost({
                userName: this.user.name,
                nickname: this.user.nick,
                text: textElem.innerHTML,
                img: imgUrl
            });
            this.showAllPost();
            this.handlerModal.closeModal();
            textElem.innerHTML = tempString;
        });

        textElem.addEventListener('click', () => {
            if(textElem.innerHTML === tempString) {
                textElem.innerHTML = '';
            }
        });

        imgElem.addEventListener('click', () => {
            imgUrl = prompt('Введите адрес картинки');
        });
    };
};

class Posts {
    constructor({ posts = [] } = {} ) {
        this.posts = posts;
    };

    addPost = (tweets) => {
        const post = new Post(tweets);
        this.posts.unshift(post);
    };

    detetePost(id) {

    };

    likePost(id) {

    };
};

class Post {
    constructor({ id, userName, nickname, postDate, text, img, likes = 0 }) {
        this.id = id ? id : this.generateID();
        this.userName = userName;
        this.nickname = nickname;
        this.postDate = postDate ? postDate : new Date(); //new Date(postDate) : new Date()
        this.text = text;
        this.img = img;
        this.likes = likes;
        this.liked = false;
    };

    changeLike() {
        this.liked = !this.liked;
        if(this.liked) {
            this.likes++;
        } else {
            this.likes--;
        };
    };

    generateID() {
        return Math.random().toString(32).substring(2, 9) + (+new Date).toString(32);
    };

    getDate = () => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };

        return this.postDate.toLocaleString('ru-Ru', options);
    };
};


const twitter = new Twitter({
    listElem: '.tweet-list',
    user: {
        name: 'Macrbc',
        nick: 'dedmax'
    },
    modalElems: [
        {
            button: '.header__link_tweet',
            modal: '.modal',
            overlay: '.overlay',
            close: '.modal-close__btn'
        }
    ],
    tweetElems: [
        {
            text: '.modal .tweet-form__text',
            img: '.modal .tweet-img__btn',
            submit: '.modal .tweet-form__btn'
        }
    ]
});