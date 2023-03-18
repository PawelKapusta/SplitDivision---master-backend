import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { FAQAttributes } from "../constants/constants";

class Faq extends Model<FAQAttributes, Optional<FAQAttributes, "id">> implements FAQAttributes {
  public id!: string;
  public question!: string;
  public answer!: string;
}

Faq.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "questions_faq",
    timestamps: false,
  },
);

export default Faq;
