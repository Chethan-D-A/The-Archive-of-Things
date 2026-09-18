const OWNER = "Chethan-D-A";
const REPO = "The-Archive-of-Things";
const BRANCH = "main";

const CACHE_KEY = "tat-archive-index";


async function getContents(path = "") {

    const url =
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `GitHub API error: ${response.status}`
        );
    }

    return response.json();
}


function titleCase(text) {

    return text
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}


function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


async function findInteractives(category) {

    const items =
        await getContents(category);

    const folders =
        items.filter(
            item => item.type === "dir"
        );


    const checks =
        folders.map(
            async folder => {

                try {

                    const contents =
                        await getContents(
                            folder.path
                        );


                    const index =
                        contents.find(
                            item =>
                                item.type === "file" &&
                                item.name.toLowerCase() === "index.html"
                        );


                    const metadata =
                        contents.find(
                            item =>
                                item.type === "file" &&
                                item.name.toLowerCase() === "archive.json"
                        );


                    if (!index || !metadata) {
                        return null;
                    }


                    const response =
                        await fetch(
                            metadata.download_url
                        );


                    if (!response.ok) {
                        return null;
                    }


                    const data =
                        await response.json();


                    return {

                        name:
                            data.title ||
                            titleCase(folder.name),

                        description:
                            data.description ||
                            "Interactive experience",

                        type:
                            data.type ||
                            "interactive",

                        path:
                            folder.path

                    };


                } catch (error) {

                    console.warn(
                        `Could not inspect ${folder.path}`,
                        error
                    );

                    return null;

                }

            }
        );


    const results =
        await Promise.all(checks);


    return results.filter(Boolean);
}


async function buildArchive() {

    const root =
        await getContents();


    const categories =
        root.filter(
            item =>
                item.type === "dir" &&
                !item.name.startsWith(".") &&
                item.name !== "assets" &&
                item.name !== "home" &&
                item.name !== "publications"
        );


    const categoryResults =
        await Promise.all(

            categories.map(
                async category => {

                    const interactives =
                        await findInteractives(
                            category.path
                        );


                    return {

                        name:
                            titleCase(
                                category.name
                            ),

                        path:
                            category.path,

                        interactives

                    };

                }
            )

        );


    return categoryResults.filter(
        category =>
            category.interactives.length > 0
    );
}


async function indexArchive() {

    const archive =
        await buildArchive();


    sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify(archive)
    );


    return archive;
}


function getIndexedArchive() {

    try {

        const cached =
            sessionStorage.getItem(
                CACHE_KEY
            );


        if (!cached) {
            return null;
        }


        return JSON.parse(cached);

    } catch {

        return null;

    }
}
