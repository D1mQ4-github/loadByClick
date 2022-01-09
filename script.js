document.addEventListener('DOMContentLoaded', function() {
    const selectors = {
        moreBtn: '[data-article-more]',
        articleContainer: '[data-article-container]'
    };

    let loadStep = 10,
        currentPageCounter = 1;

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

    function onBtnClick() {
        getResources(`https://jsonplaceholder.typicode.com/posts`)
            .then(response => {
                //Set the start and end point (eg. from 1 to 10| from 10 to 20)
                let startPoint = (currentPageCounter * loadStep) - loadStep,
                    endPoint = startPoint + loadStep;

                response.forEach((item, index) => {
                    //Set index start from 1 not from 0
                    index++;

                    if (index > startPoint && index <= endPoint) {
                        const article = createArticle(item);
                        document.querySelector(selectors.articleContainer).append(article);
                    }
                });
                //Increment current page after load current click load
                currentPageCounter++;
            });
    }

    document.querySelector(selectors.moreBtn).addEventListener('click', onBtnClick);
});