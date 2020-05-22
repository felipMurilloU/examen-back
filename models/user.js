module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: 1,
        autoIncrement: 1
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: 0
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: 0
      },
      celular: {
        type: DataTypes.TEXT,
        allowNull: 0
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: 0
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: 0
      },
      hash: {
        type: DataTypes.TEXT,
        allowNull: 0
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: 0,
        defaultValue: 1
      }
    },
    {
      indexes: [
        {
            unique: 1,
            fields: ['name']
        }
      ],
      freezeTableName: 1,
    }
  );

  return User;
}