import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { GroupAttributes } from "../constants/constants";
import User from "./userModel";

class Group
  extends Model<GroupAttributes, Optional<GroupAttributes, "id">>
  implements GroupAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public data_created!: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    data_created: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize,
    tableName: "groups",
    timestamps: false,
  },
);

Group.belongsToMany(User, { through: "groups_users" });
User.belongsToMany(Group, { through: "groups_users" });

export default Group;
