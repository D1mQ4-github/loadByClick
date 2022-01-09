document.addEventListener('DOMContentLoaded', function() {
    const selectors = {
        moreBtn: '[data-article-more]',
        articleContainer: '[data-article-container]'
    };

    let loadStep = 10,
        currentPageCounter = 1,
        postsData = null;

    function createArticle(data) {
        const article = document.createElement('article'),
            articleInner = `
                <header class="article-header">
                    <h2 class="article-heading">[${data.id}]: ${data.title}</h2>
                    <p class="article-description">${data.body}</p>
                </header>
                <footer class="article-footer">
                    <a href="#" class="article-button">See More</a>
                </footer>
            `;
        article.innerHTML = articleInner;
        article.classList.add('article');

        return article;
    }

    async function getResources(url) {
        const res = await fetch(`${url}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await res.json();
    }

    function getPosts(url) {
        getResources(url)
            .then(response => {
                //map is optional. Just for example if needed some manipulation with data
                postsData = response.map(item => item);
            });
    }

    function onBtnClick() {
        //Set the start and end point (eg. from 1 to 10| from 10 to 20)
        let startPoint = (currentPageCounter * loadStep) - loadStep,
            endPoint = startPoint + loadStep,
            insertData = []; //arr with 10 articles

        postsData.forEach((item, index) => {
            //Set index start from 1 not from 0
            index++;

            if (index > startPoint && index <= endPoint) {
                const article = createArticle(item);
                insertData.push(article);
            }
        });

        //append articles to container
        document.querySelector(selectors.articleContainer).append(...insertData);

        //Increment current page after load current click load
        currentPageCounter++;

        console.log(currentPageCounter);
    }

    getPosts(`https://jsonplaceholder.typicode.com/posts`);
    document.querySelector(selectors.moreBtn).addEventListener('click', onBtnClick);
});