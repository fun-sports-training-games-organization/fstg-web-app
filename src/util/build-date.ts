import preval from 'preval.macro';
// https://stackoverflow.com/questions/53028778/how-to-show-build-datetime-on-my-react-web-app-using-create-react-app
export default preval`module.exports = new Date().getTime();`;
