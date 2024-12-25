document.addEventListener("DOMContentLoaded", function () {
    const starCount = document.getElementById("star-count");

    // GitHub repository information
    const repoOwner = "WayneJin0918"; // Replace with your GitHub username
    const repoName = "SOTA-paper-rating"; // Replace with your repository name

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