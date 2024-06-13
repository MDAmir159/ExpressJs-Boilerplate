const normalizeRoleName = (roleName) => {
    return roleName.toLowerCase();
}

const normalizeEmail = (email) => {
    return email.toLowerCase();
}

const getUserNameFromEmail = (email) => {
    var normalizedEmail = normalizeEmail(email);
    const atIndex = normalizedEmail.indexOf('@');
    const userName = normalizedEmail.slice(0, atIndex);
    return userName;
}

const normalizeUserName = (userName) => {
    return userName.toLowerCase();
}
module.exports = {
    normalizeRoleName,
    normalizeEmail,
    getUserNameFromEmail,
    normalizeUserName
};