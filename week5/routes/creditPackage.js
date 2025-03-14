const express = require('express')

const router = express.Router()
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('CreditPackage')
const{isValidString, isNumber} = require('../utils/validUtils')

router.get('/', async (req, res, next) => {
    try {
        const data = await dataSource.getRepository("CreditPackage").find({
          select: ["id", "name", "credit_amount", "price"]
        })
        // res.writeHead(200, headers)
        // res.write(JSON.stringify({
        //   status: "success",
        //   data: packages
        // }))
        // res.end()
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        // res.writeHead(500, headers)
        // res.write(JSON.stringify({
        //   status: "error",
        //   message: "伺服器錯誤"
        // }))
        // res.end()
        next(error)
    }

})

router.post('/', async (req, res, next) => {
    try {
        const {name, credit_amount, price } = req.body
        if (!isValidString(name) || !isNumber(credit_amount) || !isNumber(price)) {
            res.status(400).json({
                status: "failed",
                message: "欄位未填寫正確"
            })
        // res.writeHead(400, headers)
        // res.write(JSON.stringify({
        //     status: "failed",
        //     message: "欄位未填寫正確"
        // }))
        // res.end()
            return
        }
        const creditPackageRepo = await dataSource.getRepository("CreditPackage")
        const existPackage = await creditPackageRepo.find({
            where: {
                name: name,
                credit_amount: credit_amount,
                price: price
            }
        })
        if (existPackage.length > 0) {
            res.status(409).json({
                status: "failed",
                message: "資料重複"
            })
            return
        // res.writeHead(409, headers)
        // res.write(JSON.stringify({
        //     status: "failed",
        //     message: "資料重複"
        // }))
        // res.end()
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
        // res.writeHead(200, headers)
        // res.write(JSON.stringify({
        // status: "success",
        // data: result
        // }))
        // res.end()
    } catch (error) {
        // console.error(error)
        // res.writeHead(500, headers)
        // res.write(JSON.stringify({
        // status: "error",
        // message: "伺服器錯誤"
        // }))
        // res.end()
        next(error)
    }
})

router.delete('/:creditPackageId', async (req, res, next) => {
    try {
        const {creditPackageId} = req.params

        if(!isValidString(creditPackageId)){
            res.status(400).json({
                status: "failed",
                message: "ID錯誤"
            })
            return
        }
        // const {name, credit_amount, price } = req.body
        // if (isUndefined(packageId) || isNotValidSting(packageId)) {
        //   res.writeHead(400, headers)
        //   res.write(JSON.stringify({
        //     status: "failed",
        //     message: "ID錯誤"
        //   }))
        //   res.end()

        const result = await dataSource.getRepository("CreditPackage").delete(creditPackageId)
        if (result.affected === 0) {
            res.status(400).json({
                status: "failed",
                message: "ID錯誤"
            })
            return
        }
        res.status(200).json({
            status: "success"
        })
      } catch (error) {
        next(error)
      }
})

module.exports = router
