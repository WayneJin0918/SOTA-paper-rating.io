<script>
    document.addEventListener("DOMContentLoaded", function () {
        // Star count code
        const starCount = document.getElementById("star-count");

        // GitHub repository information
        const repoOwner = "WayneJin0918"; // Replace with your GitHub username
        const repoName = "SOTA-paper-rating.io"; // Replace with your repository name

        // Function to get the star count
        async function getStarCount() {
            try {
                const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
                const data = await response.json();
                starCount.textContent = `${data.stargazers_count} Stars`;
            } catch (error) {
                console.error("Failed to fetch star count:", error);
                starCount.textContent = "Failed to load stars";
            }
        }

        // Initialize star count
        getStarCount();

        // Papers data
        const papers = {
            '24-1-1': [
                { id: '1', title: 'Paper Title 1', rating: '★★★★☆', codeLink: 'https://github.com/yourusername/paper1-code', thumbnail: 'images/paper1-thumbnail.jpg' },
                { id: '2', title: 'Paper Title 2', rating: '★★★☆☆', codeLink: 'https://github.com/yourusername/paper2-code', thumbnail: 'images/paper2-thumbnail.jpg' }
            ],
            '24-1-2': [
                { id: '3', title: 'Paper Title 3', rating: '★★★★★', codeLink: 'https://github.com/yourusername/paper3-code', thumbnail: 'images/paper3-thumbnail.jpg' }
            ]
            // Add more dates and papers as needed
        };

        // Initialize comments from localStorage
        let comments = JSON.parse(localStorage.getItem('comments')) || {};

        // Get elements
        const dateList = document.getElementById('date-list');

        // Function to generate date list based on selected month
        function generateDateList(month) {
            dateList.innerHTML = '';
            // Assume 31 days for simplicity; adjust as needed
            for (let day = 1; day <= 31; day++) {
                const dateKey = `24-${month}-${day}`;
                const paperList = papers[dateKey] || [];
                const dateItem = document.createElement('li');
                dateItem.className = 'date-item';

                const dateH3 = document.createElement('h3');
                dateH3.textContent = `${month}-${day}`;
                dateItem.appendChild(dateH3);

                if (paperList.length > 0) {
                    paperList.forEach(paper => {
                        const paperDiv = document.createElement('div');
                        paperDiv.className = 'paper-item';

                        // Paper thumbnail
                        const thumbnailDiv = document.createElement('div');
                        thumbnailDiv.className = 'paper-thumbnail';
                        const thumbnailImg = document.createElement('img');
                        thumbnailImg.src = paper.thumbnail;
                        thumbnailImg.alt = paper.title;
                        thumbnailDiv.appendChild(thumbnailImg);

                        // Comment overlay
                        const commentOverlay = document.createElement('div');
                        commentOverlay.className = 'comment-overlay';
                        const commentsDisplay = document.createElement('div');
                        commentsDisplay.className = 'comments-display';
                        commentOverlay.appendChild(commentsDisplay);
                        thumbnailDiv.appendChild(commentOverlay);

                        // Toggle comments button
                        const toggleComments = document.createElement('div');
                        toggleComments.className = 'toggle-comments';
                        toggleComments.textContent = 'Show Comments';
                        toggleComments.addEventListener('click', function() {
                            commentOverlay.classList.toggle('active');
                            toggleComments.textContent = commentOverlay.classList.contains('active') ? 'Hide Comments' : 'Show Comments';
                        });

                        // Append elements
                        paperDiv.appendChild(thumbnailDiv);
                        paperDiv.appendChild(toggleComments);
                        dateItem.appendChild(paperDiv);

                        // Display comments
                        displayComments(paper.id, commentsDisplay);
                    });
                } else {
                    const noPapersDiv = document.createElement('div');
                    noPapersDiv.textContent = 'No papers available for this day.';
                    dateItem.appendChild(noPapersDiv);
                }

                dateList.appendChild(dateItem);
            }
        }

        // Function to display comments for a paper
        function displayComments(paperId, commentsDisplay) {
            const paperComments = comments[paperId] || [];
            commentsDisplay.innerHTML = '';
            paperComments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                commentDiv.textContent = comment.text;
                if (comment.image) {
                    const img = document.createElement('img');
                    img.src = comment.image;
                    commentDiv.appendChild(img);
                }
                commentsDisplay.appendChild(commentDiv);
            });
        }

        // Initialize with the first month
        generateDateList('1');
    });
</script>
