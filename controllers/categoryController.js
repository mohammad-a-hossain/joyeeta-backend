const slugify = require('slugify')
const Category = require('../models/Category')


exports.addCategory =(req,res)=>{
    const categoryObj ={
        name:req.body.name,
        slug:slugify(req.body.name)
    }
   
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
      }

    const cate = new Category(categoryObj)
    cate.save((error, category)=>{
        if(error) return res.status(400).json({error})
        if(category){
            return res.status(201).json({category})
        }
    })
}
exports.getCategory =(req,res)=>{
    Category.find({})
    .exec((error,categories)=>{
        if(error) return res.status(400).json({error})
        if(categories){
            return res.status(200).json({categories})
        }
    })
}