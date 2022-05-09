const slugify = require('slugify')
const Category = require('../models/Category')

function createCategories(categories, parentId = null){
    //const categoryList =[]

    // let category 
    // if(parentId == null){
    //     category = categories.filter((cat) => cat.parentId == undefined) 
    // }else{
    //   category = categories.filter((cat) => cat.parentId == parentId) 
    // }
    // if(type == null){
    //     category = categories.filter((cat) => cat.type == undefined)
    // }else{
    //     category = categories.filter((cat) =>cat.type == type)
    // }

    // for(let cates of category){
    //     categoryList.push({
    //         _id:cates._id,
    //         name:cates.name,
    //         slug:cates.slug,
    //         type:cates.type,
    //         parentId: cates.parentId,
    //         children:createCategories(categories, cates._id, cates.type)
    //     })
    // }
    // // console.log({categoryList})
    // return categoryList
    const categoryList = []
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
 /*  if(type == null){
        category = categories.filter((cat) => cat.type == undefined)
    }else{
        category = categories.filter((cat) =>cat.type == type)
    }
 */
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}


exports.addCategory =(req,res)=>{
   // console.log(req.body)
    const categoryObj ={
        name:req.body.name,
        slug:slugify(req.body.name),
        createdBy: req.user._id
    }
   
   
    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/'+ req.file.filename
    }
   
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }
   
    const cate = new Category(categoryObj)
   
    cate.save((error, category)=>{
      // console.log(category)
        if(error) return res.status(400).json({error})
      
        if(category){
            return res.status(201).json({category})
        }
    })
}
exports.getCategory =(_req,res)=>{
    Category.find({}).exec((error, categories) => {
        if(error) return res.status(400).json({error})
        if(categories){
            const categoryList = createCategories(categories)
            return res.status(200).json({categoryList})
        }
    })
}

exports.updateCategory = async(req,res)=>{
  const {_id, name, parentId,type} = req.body 
  const updatedCategories = [] 
  //first checked if edit cat is an array 
  if(name  instanceof Array){
      for(let i=0; i <name.length; i++){
        const category= {
          name:name[i],
          //type:type[i]
        }
      if(parentId[i] !==''){
        category.parentId = parentId[i]
      }
      const updateCategory = await Category.findOneAndUpdate({_id:_id[i]},category,{new:true})
      updatedCategories.push(updateCategory)
      }
      return res.status(201).json({updatedCategories:updatedCategories})
  }else{
    // now checked if edit cat issingle item
    const category= {
      name,
      type,
    }
  if(parentId !==''){
    category.parentId = parentId
  }
  const updateCategory = await Category.findOneAndUpdate({_id},category,{new:true})
  updatedCategories.push(updateCategory)
  }
  return res.status(201).json({updatedCategories})
  }

