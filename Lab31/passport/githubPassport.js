const GitHubStrategy = require("passport-github2").Strategy;
const model = require("../models/index")
const Provider = model.Provider;
const User = model.User;

module.exports = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: [
            "profile",
            "user:email"
        ]
    },
    async (accessToken, refreshToken, profile, done) => {
        const { _json, emails } = profile;
        const [{ value: email }] = emails;
        const { name } = _json;

        // Provider
        const nameProvider = "github";
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