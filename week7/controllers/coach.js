const { dataSource } = require('../db/data-source')
const appError = require('../utils/appError')
const logger = require('../utils/logger')('creditPackageController')
const { isValidString, isValidPassword, isUndefined, isNotValidString, isNumber } = require('../utils/validUtils')
const bcrypt = require('bcrypt')
const isAuth = require('../middleware/isAuth')




const coachController = {
    async getCoachList(req, res, next ) {
        const { per, page } = req.query;
        
        if(!isValidString(per) || !isValidString(page)){
            return next(appError(400, '欄位未填寫正確'))
        }

        const coachRepo = await dataSource.getRepository('Coach')
        const coaches = await coachRepo.find({
            select: ['id', 'name'],
            skip: (page - 1) * per,
            take: per
        })
        res.status(200).json({
            status: 'success',
            data: coaches
        })
    },

    async getCoachDetail(req, res, next) {
        const { coachId } = req.params
        console.log("print")
        console.log(coachId)
        if(!isValidString(coachId)){
            res.status(400).json({
                status: 'failed',
                message: '欄位未填寫正確'
            })
            return
        }
        const coachRepo = await dataSource.getRepository('Coach')
        const coach = await coachRepo.findOne({
            where: {
                id: coachId
            },
            relations: ['user']
        })
        console.log("print")
        console.log(coach)
        
        if(!coach){
            res.status(404).json({
                status: 'failed',
                message: '找不到該教練'
            })
            return
        }
        console.log(coach)
        res.status(200).json({
            status: 'success',
            data: {
                "user":{
                    "id": coach.id,
                    "name": coach.name,
                    "role": coach.user.email
                },
                "coach":{
                    "id": coach.id,
                    "user_id": coach.user_id,
                    "experience_years": coach.experience_years,
                    "description": coach.description,
                    "profile_image_url": coach.profile_image_url,
                    "created_at": coach.created_at,
                    "updated_at": coach.updated_at
                }
            }
        })
    }
}

module.exports = coachController