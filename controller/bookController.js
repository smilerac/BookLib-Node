const express = require('express')
// const app = express()


const router = express.Router()
const books = require('../models/bookmodel')
const authorize = require('../middlewares/authorize')


router.get('/', (req, res) => {
    books.find()
    .then( books => {
        res.status(200).json(books)
    })
    .catch(error => {
        res.status(500).json({ message: 'Unable to perform operation ', error: String(error)})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    books.findByID(id)
    .then( book => {
        if(book){
            res.status(200).json(book)
        }
        else{
            res.status(404).json({message: "Book not found"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Unable to perform operation ', error: String(error)})
    })
})

router.use(authorize)

router.post('/add', (req, res) => {
    // console.log('add book',req.body)
    // const { password } = req.body
    books.add(req.body)
    .then(book => {
        res.status(200).json(book)
    })
    .catch(error => {
        res.status(500).json({message : 'cannot add book ', error: String(error)})
    }) 
})

router.use(authorize)
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // console.log('k',id)
    books.update(id, changes)
    .then(bookID => {
        if(bookID){
            res.status(200).json(bookID)
        }
        else{
            res.status(404).json({message: "Unable to locate book"})
        }
    })
    .catch(error => {
        res.status(500).json({message : 'Cannot update book ', error: String(error)})
    }) 
})

router.use(authorize)
router.delete('/:id', (req, res) => {
    // console.log('user',req.user)
    const { id } = req.params;
    books.remove(id)
    .then (delCount => {
        if (delCount > 0){
            res.status(200).json({ message: "Successfully deleted "})
        }
        else{
            res.status(404).json({message: "Unable to locate book"})
        }
    })
    .catch(error => {
        res.status(500).json({message : 'Unable to delete ', error: String(error)})
    }) 
    
})



module.exports = router