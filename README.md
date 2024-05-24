# URL Shortener API

- It's a service that takes in valid URL and returns a Shortener URL, redirecting the user to the proviously provided URL.

- Also, keep treak of total visits/clicks on the URL 

# Routes
- POST/URL - Generates a new short URl and returns the Shortener URL 
- GET/:id - redirects the user to original URL
- GET/URL/analytics/:id - Returns the clicks for the provided Short id. 
