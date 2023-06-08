module.exports = {
    use: [
        { loader: 'scoped-css-loader' },
    ],
    babel: {
        plugins: ["babel-plugin-react-scoped-css"]
    }
};