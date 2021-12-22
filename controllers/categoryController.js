const slugify = require('slugify')
const Category = require('../models/Category')

function createCategories(categories,parentId = null){
    const categoryList =[]
    let category 
    if(parentId === null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat =>cat.parentId == parentId)
    }

    for(let cates of category){
        categoryList.push({
            _id:cates.id,
            name:cates.name,
            slug:cates.slug,
            children:createCategories(categories, cates._id)
        })
    }
    return categoryList
}


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
            const categoryList = createCategories(categories)
            return res.status(200).json({categoryList})
        }
    })
}