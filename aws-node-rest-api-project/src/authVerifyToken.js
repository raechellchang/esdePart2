const jwt = require('jsonwebtoken');
const verifyToken = (event, context,callback) => {
    console.log(event);

    const token = event.authorizationToken;
    console.log(token);
    if(!token){
        return callback(null,generatePolicy('*','Deny', event.methodArn));

    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        console.log(err);
        comsole.log(decoded);
        if(err){
            return callback(null,generatePolicy('*','Deny', event.methodArn));
        }
        console.log('inspect the Arn value associated..');
        console.log(event.methodArn);
        return callback(null,generatePolicy(decoded.id,'Allow', event.methodArn))
    });
};

var generatePolicy = function(principalId, effect, resource){
    var authResponse = {};

    authResponse.principalId = principalId;
    if (effect && resource){
        var policyDocument = {};
        policyDocument.Statement = [];

        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        stataementOne.Resource =resource;
        policyDocument.Statement.push(statementOne);
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}
module.exports = {
    handler: verifyToken
}