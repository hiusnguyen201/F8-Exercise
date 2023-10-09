module.exports = {
    getError: (errors, field) => {
        // console.log(errors);
        const error = errors.find(({ path }) => path === field);

        if (error) {
            return error.msg;
        }
    },
};