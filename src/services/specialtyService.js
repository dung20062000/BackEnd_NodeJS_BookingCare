import db from "../models/index";
require('dotenv').config()

let  createSpecialtyService = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.name 
                || !data.imageBase64 
                || !data.descriptionHTML 
                || !data.descriptionMarkdown){

                resolve({
                    errCode: 1,
                    errMessage : 'missing parameter'
                })
            }else{
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown

                })
                resolve({
                    errCode: 0,
                    errMessage : 'create special success'
                })
            }
        }catch(err){
            reject(err);
        }
    })
}

module.exports = {
    createSpecialtyService: createSpecialtyService
}

