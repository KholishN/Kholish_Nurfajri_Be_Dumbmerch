const { user, transaction, product } = require("../../models");

exports.buyProduct = async (req, res) => {
    try {
        const idBuyer = req.user.id
        let buy = await transaction.create({
            ...req.body,
            idBuyer: req.user.id,
            status: "pending",
            
        });

         res.status(200).send({
            status: "Success",
            message:`Your Transaction with id: ${idBuyer} Sucess`,
            data: {
                id: buy.id,
                idProduct: buy.idProduct,
                idBuyer: req.user.id,
                idSeller: buy.idSeller,
                price: buy.price,
                status: "success"
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getAllTransaction = async (req, res) => {
    try {
        const dataTransaction = await transaction.findAll({
        include: [
            {
                model: product,
                as: "product",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idUser", "qty", "price",],
                },
            },

            {
                model: user,
                as: "buyer",
                attributes: {
                exclude: ["createdAt", "updatedAt", "password", "status"],
                },
            },

            {
                model: user,
                as: "seller",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password", "status"],
                },
            },
        ],

        attributes: {
            exclude: ["createdAt", "updatedAt","idProduct","idBuyer","idSeller",]
        },
    });

        return res.status(200).send({
        status: "succes",
        dataTransaction,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        status: "failed",
        error: "server error",
        });

    }
    };