const express = require('express');
const router = express.Router();
const Author = require('../models/author'); // Importing the author model

// Display the all authors route 

router.get('/', async (req,res) =>{

    //implementing the search field feature

    let searchOptions = {};

    // Now will filter out the search result based on the search box

    if(req.query.name != null && req.query.name !=='' ){
        
        // If this condition is true, then search the typed author

        searchOptions.name = new RegExp(req.query.name,'i'); 
    }
 
    try{
     
        const authors = await Author.find(searchOptions);
        res.render('authors/index',{
            authors: authors,
            //Here we want the the name what you typed for searching should remain in the search box
            searchOptions: req.query
         });
    }
    catch{
        res.render('/');
    }
});

// Form for the create author route

router.get('/new',(req,res) =>{
 
    res.render('authors/new', { author: new Author()});
});

// POST request route for creating a new author

router.post('/',async (req,res) =>{
 
    // Now we want to save the input in the database as well with the same author name
  
    // Object created for the database with the same name

     const author = new Author({
         name: req.body.name
     });

     try{
     const newAuthor = await author.save();
      //res.redirect(`authors/${newAuthor.id }`)
      res.redirect('authors');
     
     }
     catch{
            
            res.render('authors/new',{
                author: author,
                errorMessage:`Error Creating Author`
                
            });
        }// end of catch block   
});

module.exports = router;