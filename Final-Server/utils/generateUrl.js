
const generateUrl = (req) => {
    return(req.protocol + '://' + req.headers.host)
}

module.exports = {
    generateUrl
}