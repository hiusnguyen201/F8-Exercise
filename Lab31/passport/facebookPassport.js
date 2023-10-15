const FacebookStrategy = require("passport-facebook").Strategy;
const model = require("../models/index")
const Provider = model.Provider;
const User = model.User;

module.exports = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: [
            'id',
            'displayName',
            'email'
        ]
    },
    async (accessToken, refreshToken, profile, done) => {
        const { _json } = profile;
        const { name, email } = _json;
        
        // Provider
        const nameProvider = "facebook";
        let provider = await Provider.findOne({
            where: {
                name: nameProvider,
            }
        })
        let providerId;
        if (!provider) {
            provider = await Provider.create({
                name: nameProvider,
            })
        }
        providerId = provider.id;

        // User
        let user = await User.findOne({
            where: {
                email: email,
                provider_id: providerId,
            }
        });

        if (!user) {
            user = await User.create({
                name: name,
                email: email,
                provider_id: providerId,
            })
        }

        done(null, user);
    }
);