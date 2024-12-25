document.addEventListener("DOMContentLoaded", function () {
    // Date Filter Functionality
    const dateFilterLinks = document.querySelectorAll('#date-filter a');
    const paperItems = document.querySelectorAll('.paper-item');

    dateFilterLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const selectedDate = this.getAttribute('data-date');

            paperItems.forEach(item => {
                const itemDate = item.getAttribute('data-date');
                const itemYearMonth = itemDate.slice(0, 7); // Extract YYYY-MM from the date

                if (selectedDate === 'all' || selectedDate === itemYearMonth) {
                    item.style.display = 'block'; // Show the item
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });
        });
    });

    // GitHub Star Count Functionality
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
});
