$(document).ready(function () {
    const $form = $("form");
    const $input = $("#text");
    const $container = $("#cards");

    $form.on("submit", async function (e) {
        e.preventDefault();

        const username = $input.val().trim();
        if (!username)
            return;

        $container.empty();

        const repos = await fetchRepos(username);

        for (const repo of repos) {
            addCard({
                name: repo.name,
                description: repo.description,
                url: repo.html_url
            });
        }
    });

    async function fetchRepos(username) {
        try {
            const res = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!res.ok)
                return [];

            return await res.json();
        } catch (err) {
            return [];
        }
    }

    function addCard({ name, description, url }) {
        const $col = $("<div>", {
            class: "col-md-4" }
        );

        $col.html(`
            <div class="card h-100">
                <div class="card-body text-center">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description || "No description available."}</p>
                    <a href="${url}" class="btn btn-primary" target="_blank">View Repo</a>
                </div>
            </div>
        `);

        $container.append($col);
    }
});