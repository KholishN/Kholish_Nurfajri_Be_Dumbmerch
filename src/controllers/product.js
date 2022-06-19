const {product,user,category,categoryProduct} = require("../../models")

exports.getProducts = async (req, res) => {
    try {

        let products = await product.findAll({

           include: {
                model: category,
                as: "categories",
                through:{
                    model: categoryProduct,
                    as:"bridge"
                }
           },

            attributes: {
                exclude: ["createdAt","updatedAt","idUser",]
            }
        })

        products = products.map((item) => {
            item.image = "http://localhost:5000/uploads/" + item.image

            return item
        })

        res.send({
            status: "Success",
            message: "Here Data Peoduct",
            products
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getProductDetail = async (req, res) => {
    try {
        const id = req.params.id
        const productDetail = await product.findOne({
            where: {
              id
            },
            attributes: {
                exclude: ["password","createdAt","updatedAt","idUser"]
            }
          })

          if(!productDetail){
            return res.send({
                message:`User with id: ${id} Not Found`
            })
        }

        res.send({
            status: "Success",
            message: `Here Product with id: ${id}`,
            productDetail
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getUserProduct = async (req, res) => {
    try {

        const dataUsers = await user.findAll({
            include: {
                model: product,
                as:"userProduct",
                attributes: {
                    exclude: ["createdAt","updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        res.send({
            status: "Success",
            message: "Here Data Peoduct",
            dataUsers
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const data = await product.create({
            ...req.body,
            image: req.file.filename,
            idUser: req.user.id
        })

        const id = data.id

        const users = await product.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ["password","createdAt","updatedAt"]
                },

            include: {
                model: user,
                as:"user",
                attributes: {
                    exclude: ["createdAt","updatedAt","password","status"]
                }
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        res.send({
            status: "Success",
            message: "Add Product Finished ",
            users
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const newProduct = req.body;

        const products = await product.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["idUser","createdAt","updatedAt"]
            },

        })

        if(!products){
            return res.send({
                message:`User with id: ${id} Not Found`
            })
        }
        
        await product.update(newProduct,{
            where: {
                id
            },
           
        })

        res.send({
            status: "Success",
            message: `Update Product with id: ${id} Success`,
            newProduct,
            
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await product.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message:`Product with id: ${id} Not Found`
            })
        }
        
        
        await product.destroy({
            where : {
                id
            }
        })

        res.send({
            status: "Success",
            message: `Delete Product with id: ${id} Success`,
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}