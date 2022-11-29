const isEmpty = (string) => {
    return string.trim() === "";
};

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email.match(emailRegEx);
};

exports.validateLoginData = (data) => {
    let errors = {};

    // Check if either email or password is empty
    if (isEmpty(data.email)) errors.email = "Email must not be empty";
    if (isEmpty(data.password)) errors.password = "Password must not be  empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};

exports.validateSignUpData = (data) => {
    let errors = {};

    // Check if either email is valid
    if (isEmpty(data.email)) errors.email = "Email must not be empty";
    else if (!isEmail(data.email)) errors.email = "Must be valid email address";

    // Check if phone number is valid
    if (isEmpty(data.phoneNumber)) errors.phoneNumber = "Phone number must not be empty";
    else if (!/^\d+$/.test(data.phoneNumber)) errors.phoneNumber = "Invalid phone number"

    // Check if other details are empty
    if (isEmpty(data.firstName)) errors.firstName = "First name must not be empty";
    if (isEmpty(data.lastName)) errors.lastName = "Last name must not be empty";
    if (isEmpty(data.country)) errors.country = "Country must not be empty";

    //
    if (isEmpty(data.password)) errors.password = "Password must not be empty";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords must be the same";
    if (isEmpty(data.username)) errors.username = "Must not be empty"

    console.log(errors)

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};