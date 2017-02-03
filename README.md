
# SpendAware backend

SpendAware is a small application made for Cyber security course of mooc.fi in 2016-2017, organized in collaboration by F-Secure and the department of computer science of University of Helsinki.

This repository is the backend for my application. The purpose of this project, as defined by the course, is to create a web application that intentionally has at least five different security flaws from the OWASP top ten list.

The idea in my project specifically was to have a simple app you could use to track your spending. It's mostly made for the purposes of this course though, and as such it's rather lacking in features.


### Run instructions:

These instructions assume you have git and the newest version of Node.js and npm (Node package manager) installed. If you don't, install them first. Download links: [Node.js and npm](https://nodejs.org/en/download/) (npm comes with Node.js) and [git](https://git-scm.com/downloads).

1. Clone the repo on your computer
2. Go to the location of the cloned repo in the terminal application you use
3. Type `npm install`
4. Type `PORT=8080 npm run dev`
5. Now, the program runs in address `http://localhost:8080` (the paths being behind /api/. See the frontend repository for the user interface.

---

### Report on (some of the) security issues

All the flaw identification instructions below assume that you have both the backend and the frontend running.

#### Issue: SQL injection

Steps to reproduce:

1. Open a new tab in your browser of choice
2. Select the url field
3. Write: localhost:8080/api/users/1 OR 1=1
4. Press enter
5. You can now see the user info of all the users in the database of the application

The fix for this would be pretty simple: have prepared queries. At the moment none of the queries in the app are prepared, but instead they all use simple concatenation where needed. From security viewpoint, this is obviously pretty horrible.

#### Issue: Broken authentication management

Steps to reproduce:

1. Open a new tab in your browser of choice
2. Select the url field
3. Write: localhost:8080/api/users/1
4. Press enter
5. You can now see the username of the user with id 1

This one is actually pretty funny at least in my opinion. When you go to the app itself (the frontend), there is authentication and that actually works somewhat decently. You send your username and password info to the server and you get back a valid json web token (assuming your info was correct). But the problem is, that's the only place authentication is ever used. None of the paths are actually protected, but you can still use the API freely.

The fix for this would be to create a middleware function that checks before every request (apart from the authentication) that your token is valid and that you have the rights to whatever you're trying to do at the server. If not, then the server would give you 403 status code.


#### Issue: XSS attacks

Steps to reproduce:

1. Go to localhost:8081 in your browser and log in (register if you haven't yet)
2. Once logged in, press the 'ADD NEW' button.
3. Write <script>alert(123)</script> to the Name field
4. Write 50 to the Cost field
5. Press SUBMIT
6. Now your browser alerts you with the message 123

To get XSS attacks possible to be made, I actually had to cheat a little (or not so little). By default React is too smart to set inner html from code, so I needed to explicitly tell it that it's fine to set this inner html. React's function for this is well named by the way: 'dangerouslySetInnerHtml'. Even then, it didn't wanna run any scripts, so I had to put in code that every time a text component is rendered, it checks if there are any elements with the script tag, and if there are, then those elements are evaluated. 

So yeah, the other flaws didn't really require anything special to have them. Despite being really silly to make such flaws, it's still easy to do them especially if you aren't aware of the security issues. But for this one, due to React, I needed to do some special work. In a way, that feels kind of cheating for the assignment. It's quite unlikely that someone would actually do this for their site, though I guess not impossible at all. Regardless though, it was still a learning experience.

Anyway, obviously, the solution for the issue would be to simply remove the code (in the frontend repository's src/components/atoms/Text.jsx file) that makes the XSS attack possible. Also some validations on the backend side would be good so that any scripts wouldn't go to the database at all in the first place.

#### Issue: Security misconfiguration

Steps to reproduce:

1. Open a new tab in your browser of choice
2. Select the url field
3. Write: localhost:8080/api/users/1
4. Press enter
5. You can now see the user info, including the password of the user with id 1

At the moment, passwords are stores as plain text in the database and thus if someone managed to fetch them they're instantly abusable. Sadly, while being such an obvious and huge mistake, it doesn't seem to be that uncommon. Anyway, the obvious solution for this would be to encrypt and salt them properly. Also, naturally, you shouldn't be able to fetch someone's info so easily. The paths should be behind authentication.

#### Issue: Insecure direct object references

Steps to reproduce:

1. Open a new tab in your browser of choice
2. Select the url field
3. Write: localhost:8080/api/items/1 OR 1=1
4. Press enter
5. You can now see the items posted in the database

Ok, this is basically the same as in the earlier report about the SQL injection, but the point stands. The path parameter is used directly as it is, so a person can write basically any query there. The app really should use prepared queries.
