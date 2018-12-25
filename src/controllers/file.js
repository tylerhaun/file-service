const sqlite = require("sqlite");
const Sequelize = require("sequelize");
const uuid = require('uuid/v4');

const debug = require("debug")(__filename);

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});


var model = sequelize.define("comment", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
    },
    fileUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    groups: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    }
}, {
    timestamps: true
});

sequelize.sync();

class CrudController {

    create(data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        return this.model.bulkCreate(data);
    }

    read(query, options) {
        debug("read ", query);
        const finishedQuery = Object.assign({}, {where: query}, options);
        console.log("finishedQuery", finishedQuery);
        return this.model.findAll(finishedQuery);
    }

    update() {
        throw new Error("Not Implemented");
    }

    delete() {
        throw new Error("Not Implemented");
    }

    count(query) {
        return this.model.count({where: query})
    }

}

export default class FileController extends CrudController {

    constructor() {
        super()
        this.model = model;
    }

}
