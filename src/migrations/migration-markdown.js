'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Markdowns', {
        // address: DataTypes.STRING,
        // description: DataTypes.TEXT,
        // image: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    //   contentHTML: DataTypes.TEXT('long') ,
    //   contentMarkdown: DataTypes.TEXT('long'),
    //   description: DataTypes.TEXT,
    //   doctorId: DataTypes.INTEGER,
    //   specialtyID: DataTypes.INTEGER,
    //   clinicId: DataTypes.INTEGER,

      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      doctorId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      specialtyID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      clinicId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Markdowns');
  }
};