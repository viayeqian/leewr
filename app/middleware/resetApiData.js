'use strict';

module.exports = () => {
	return async function resetApiData(ctx, next) {
        await next()
        let body = ctx.body
        ctx.body = {
            success: true,
            data: body
        }
	}
}