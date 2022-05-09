const Product = require('../../models/Product')
const Category = require('../../models/Category')


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
            type:cates.type,
            children:createCategories(categories, cates._id)
        })
    }
    return categoryList
}


exports.getAllData = async (req,res)=>{
    const categories = await Category.find({}).exec()

    const products = await Product.find({}).select('_id name price quantity slug description productPics category')
    .populate({ path: 'category', select: '_id name'})
    .exec()
    res.status(200).json({
        categories:createCategories(categories), 
        products

    }) 
  
}

/* 
  res.status(200).json({
        categories, 
        products,

    })

*/