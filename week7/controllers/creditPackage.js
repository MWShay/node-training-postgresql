const { dataSource } = require('../db/data-source')
const appError = require('../utils/appError')
const logger = require('../utils/logger')('creditPackageController')
const { isValidString, isValidPassword, isUndefined, isNotValidString, isNumber } = require('../utils/validUtils')
const bcrypt = require('bcrypt')
const isAuth = require('../middleware/isAuth')

const creditPackageController = {
    async getPackage(req, res, next) {
        const data = await dataSource.getRepository("CreditPackage").find({
            select: ["id", "name", "credit_amount", "price"]
          })
          res.status(200).json({
              status: "success",
              data: data
          })
    },
    async postPackage(req, res, next) {
        const {name, credit_amount, price } = req.body
        if (!isValidString(name) || !isNumber(credit_amount) || !isNumber(price)) {
            return next(appError(400, "欄位未填寫正確"))
        }
        const creditPackageRepo = await dataSource.getRepository("CreditPackage")
        const existPackage = await creditPackageRepo.find({
            where: {
                name: name,
                credit_amount: credit_amount,
                price: price
            }
        })
        logger.info(`existPackage: ${JSON.stringify(existPackage)}`)
        if (existPackage.length > 0) {
            return next(appError(409, "資料重複"))

        }
        const newPackage = await creditPackageRepo.create({
            name,
            credit_amount,
            price
        })
        const result = await creditPackageRepo.save(newPackage)
        res.status(200).json({
            status: "success",
            data: result
        })

    },
    async deletePackage(req,res,next) {
        const {creditPackageId} = req.params

        if(!isValidString(creditPackageId)){
            return next(appError(400, "ID錯誤"))
        }

        const result = await dataSource.getRepository("CreditPackage").delete(creditPackageId)
        if (result.affected === 0) {
            return next(appError(400, "ID錯誤"))
        }
        res.status(200).json({
            status: "success"
        })

    }
}

module.exports = creditPackageController