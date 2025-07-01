# Simple Blog Web App

This is a simple blog web application built with **Node.js**, **Express**, and **EJS**.  
You can add, view, edit, and delete blog posts.  
All data is stored in memory (not persistent).

## Features

- View all blog posts on the home page
- Add a new post
- View a single post
- Edit a post
- Delete a post
- Responsive design using Bootstrap 4

## Project Structure

```
/seccion_26_blog_web_app
  |-- index.js
  |-- /views
      |-- index.ejs
      |-- add.ejs
      |-- view.ejs
      |-- edit.ejs
      |-- header.ejs
      |-- nav.ejs
      |-- footer.ejs
  |-- /public
      |-- css/
      |-- js/
      |-- fontawesome-5.5/
      |-- slick/
      |-- magnific-popup/
```

## Getting Started

1. **Install dependencies**

   ```
   npm install express body-parser ejs
   ```

2. **Run the app**

   ```
   node index.js
   ```

3. **Open your browser**

   Go to [http://localhost:3000](http://localhost:3000)

## Usage

- **Home:** View all posts.
- **Add Post:** Click "Add Post" to create a new blog entry.
- **View Post:** Click on a post to see its details.
- **Edit Post:** Click "Edit" on a post to modify it.
- **Delete Post:** Click "Erase" to remove a post.

## Notes

- Posts are stored in memory and will be lost when the server restarts.
- Static assets (CSS, JS, images) are served from the `/public` directory.

## License

MIT