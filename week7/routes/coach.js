const express = require('express')

const router = express.Router()
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('Coach')

const{ isValidString, isNumber } = require('../utils/validUtils')
const handleErrorAsync = require('../utils/handleErrorAsync')
const coachController = require('../controllers/coach')



router.get('/', handleErrorAsync(coachController.getCoachList))
    // try{
    //     const { per, page } = req.query;
    //     if(!isValidString(per) || !isValidString(page)){
    //         next(appError(400, '欄位未填寫正確'))
    //         return
    //         // res.status(400).json({
    //         //     status: 'failed',
    //         //     message: '欄位未填寫正確'
    //         // })
    //         // return
    //     }

    // }catch(error){
    //     logger.error(error)
    //     next(error)
    // }


router.get('/:coachId', handleErrorAsync(coachController.getCoachDetail))
//     try{
//         const { coachId } = req.params
//         if(!isValidString(coachId)){
//             res.status(400).json({
//                 status: 'failed',
//                 message: '欄位未填寫正確'
//             })
//             return
//         }
//         const coachRepo = await dataSource.getRepository('Coach')
//         const coach = await coachRepo.findOne({
//             where: {
//                 id: coachId
//             }
//         })
//         if(!coach){
//             res.status(404).json({
//                 status: 'failed',
//                 message: '找不到該教練'
//             })
//             return
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 "user":{
//                     "id": coach.id,
//                     "name": coach.name,
//                     "role": coach.user.email
//                 },
//                 "coach":{
//                     "id": coach.id,
//                     "user_id": coach.user_id,
//                     "experience_years": coach.experience_years,
//                     "description": coach.description,
//                     "profile_image_url": coach.profile_image_url,
//                     "created_at": coach.created_at,
//                     "updated_at": coach.updated_at
//                 }
//             }
//         })
//     }catch(error){
//         logger.error(error)
//         next(error)
//     }
// })


module.exports = router