// index.js
window.addEventListener('load', function() {
    // Replace 'other-page.html' with the path to the HTML page you want to load
    var pageToLoad = 'generated/index.html';

    // Use XMLHttpRequest to load the content of the other HTML page
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pageToLoad, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Replace 'content-container' with the ID of the element where you want to load the content
            document.getElementById('content-container').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});