const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////
const dataFilePath = path.join(__dirname, '../data/posts.json');
function getAllPosts() {
    try {
        const rawData = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(rawData);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}
///////////////////////////////////////////////////////////////
function writePosts(posts) {
    const jsonData = JSON.stringify(posts, null, 2);

    fs.writeFileSync(dataFilePath, jsonData);
}
///////////////////////////////////////////////////////////////
module.exports = {
    getAllPosts,
    writePosts
};
