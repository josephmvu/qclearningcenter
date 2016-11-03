var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DB_URL);

// check to see if connected to database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING 
    },
    lastName: {
        type: Sequelize.STRING 
    },
    email: {
        type: Sequelize.STRING,
        notNull: true,
        unique: {
            msg: 'That email is already registered.'
        },
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

User.sync({force:false});

module.exports.User = User;