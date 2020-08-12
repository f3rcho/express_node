function isRequestAjaxOrApi(req) {
    // if req do not accept html or xhr
    return !req.accepts('html') || req.xhr;
}

module.exports = isRequestAjaxOrApi;