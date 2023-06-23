import db from "../models/index";
import _ from "lodash";
require("dotenv").config();

let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.address ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter",
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: "create Clinic success",
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};

let handleGetAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = Buffer.from(item.image, "base64").toString(
                        "binary"
                    );
                    return item;
                });
                // console.log('check data', data);
            }
            resolve({
                errCode: 0,
                errMessage: "ok",
                data,
            });
        } catch (err) {
            reject(err);
        }
    });
};

let handleGetDetailClinicByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter",
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: [
                        "name",
                        "address",
                        "descriptionMarkdown",
                        "descriptionHTML",
                    ],
                });

                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId,
                        },
                        attributes: ["doctorId", "provinceId"],
                    });
                    data.doctorClinic = doctorClinic;
                } else data = {};
                resolve({
                    errCode: 0,
                    errMessage: "ok",
                    data,
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    createClinicService: createClinicService,
    handleGetAllClinicService: handleGetAllClinicService,
    handleGetDetailClinicByIdService: handleGetDetailClinicByIdService,
};
