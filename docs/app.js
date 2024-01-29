import{createBarChart} from "./bar_chart.js"
import{drawWordCloud} from "./word_cloud.js"



function countWordOccurrences(wordsArray) {
    var count = {};
    wordsArray.forEach(function(word) {
        word = word.toLowerCase(); // Convert to lower case
        count[word] = (count[word] || 0) + 1;
    });
    return count;
}

// data viz on title of repos

//fetch('/gt_followers/words.json')
fetch('/gt_followers/words.json')
    .then(response => response.json())
    .then(words => {
        // Process your words here
        var wordCounts = countWordOccurrences(words);

        var wordCloudData = Object.keys(wordCounts).map(function(key) {
            return { word: key, size: wordCounts[key] };
        });
        drawWordCloud(wordCloudData)
        // Convert object to array and sort it, then slice it
        const wordCountsData = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 30);

        // Convert back to object
        const sortedWordCounts = Object.fromEntries(wordCountsData);
        createBarChart(sortedWordCounts, "#wordChart2")
    })
    .catch(error => console.error('Error fetching data:', error));


// data viz on usernames

//fetch('/gt_followers/words.json')
fetch('/gt_followers/repo_count.json')
    .then(response => response.json())
    .then(users_repo_count => {
        const users_repo = Object.entries(users_repo_count).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const users_with_most_repos = Object.fromEntries(users_repo);
        console.log(users_with_most_repos)
        createBarChart(users_with_most_repos, "#wordChart1")
    })
    .catch(error => console.error('Error fetching data:', error));
