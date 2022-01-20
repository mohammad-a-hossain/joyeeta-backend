const Product = require("../../models/Product")
const Category = require('../../models/Product')


// copy from category controller for getting the category
function createCategories(categories,parentId = null){
    const categoryList =[]

    let category 
    if(parentId === null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat =>cat.parentId == parentId)
    }

    for(let cat of category){
        categoryList.push({
            _id:cat.id,
            name:cat.name,
            slug:cat.slug,
            children:createCategories(categories, cat._id)
        })
    }
    return categoryList
}


exports.getAllProductData = async (req,res)=>{
         const categories = await Category.find({}).exec()
        
         const products = await Product.find({}).select( '_id name price quantity slug description ').exec()
         res.status(200).json({
             categories:createCategories(categories), 
             products,
  
         })
       
}